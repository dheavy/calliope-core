// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IMarket.sol";
import "./Product.sol";

contract Market is
    IMarket,
    Pausable
{
    // Address to linked Product contract.
    address public product;

    // Mapping of token IDs to mapping of EOA bidders to their bids for the token.
    mapping(uint256 => mapping(address => Bid)) private _bidders;

    // Address of contract for accepted ERC20 currency for transactions.
    address private _currency;

    // Mapping of token IDs to bid shares currently applying.
    mapping(uint256 => BidShares) private _bidShares;

    // Mapping of token IDs to their current auction Asks.
    mapping(uint256 => Ask) private _asks;

    modifier onlyProduct() {
        require(
            msg.sender == product,
            "Market: Product call only"
        );
        _;
    }

    constructor(
        address product_,
        address currency_
    ) {
        product = product_;
        _currency = currency_;
    }

    function setAsk(
        uint256 tokenId_,
        Ask calldata ask_
    )
        external
        override
        onlyProduct
    {
        require(
            isValidBid(tokenId_, ask_.amount),
            "Market: invalid Ask for share-splitting"
        );
        _asks[tokenId_] = ask_;
        emit AskCreated(tokenId_, ask_);
    }

    function removeAsk(
        uint256 tokenId_
    )
        external
        override
        onlyProduct
    {
        emit AskRemoved(tokenId_, _asks[tokenId_]);
        delete _asks[tokenId_];
    }

    function setBid(
        uint256 tokenId_,
        Bid calldata bid_,
        address from_
    )
        external
        override
        onlyProduct
    {
        BidShares memory bidShares = _bidShares[tokenId_];

        require(
            bidShares.creator.value + bid_.sellOnShare.value <= uint256(100) * Decimal.BASE,
            "Market: invalid sell-on fee for share-splitting"
        );
        require(
            bid_.bidder != address(0),
            "Market: invalid bidder"
        );
        require(
            bid_.amount != 0,
            "Market: invalid bid"
        );
        require(
            bid_.currency != address(0),
            "Market: invalid currency"
        );
        require(
            bid_.currency == _currency,
            "Market: currency not accepted"
        );
        require(
            bid_.recipient != address(0),
            "Market: invalid bid recipient"
        );

        Bid storage existingBid = _bidders[tokenId_][bid_.bidder];

        if (existingBid.amount > 0) {
            removeBid(tokenId_, bid_.bidder);
        }

        IERC20 token = IERC20(bid_.currency);

        // Check balance was actually transfered to market.
        // Some tokens impose a transfer fee and would not actually transfer
        // the full mount to the market, resulting in locked funds
        // for refunds and bid acceptance.
        uint256 balanceBefore = token.balanceOf(address(this));
        token.transferFrom(from_, address(this), bid_.amount);

        uint256 balanceAfter = token.balanceOf(address(this));
        _bidders[tokenId_][bid_.bidder] = Bid(
            balanceAfter - balanceBefore,
            bid_.currency,
            bid_.bidder,
            bid_.recipient,
            bid_.sellOnShare
        );
        emit BidCreated(tokenId_, bid_);

        // Automatically accept bid and transfer ownership if criteriae for an ask are met.
        // Ignore if criterae aren't met or Ask isn't set.
        if (_canAcceptBidAutomatically(tokenId_, bid_)) {
            _finalizeTransfer(tokenId_, bid_.bidder);
        }
    }

    function removeBid(
        uint256 tokenId_,
        address bidder_
    )
        public
        override
        onlyProduct
    {
        Bid storage bid = _bidders[tokenId_][bidder_];
        uint256 bidAmount = bid.amount;
        address bidCurrency = bid.currency;

        require(
            bid.amount > 0,
            "Market: cannot remove bid"
        );

        IERC20 token = IERC20(bidCurrency);

        emit BidRemoved(tokenId_, bid);
        delete _bidders[tokenId_][bidder_];
        token.transfer(bidder_, bidAmount);
    }

    function acceptBid(
        uint256 tokenId_,
        Bid calldata expectedBid_
    )
        external
        override
        onlyProduct
    {
        Bid memory bid = _bidders[tokenId_][expectedBid_.bidder];
        require(
            bid.amount > 0,
            "Market: invalid bid"
        );
        require(
            bid.amount == expectedBid_.amount &&
            bid.currency == expectedBid_.currency &&
            bid.sellOnShare.value == expectedBid_.sellOnShare.value &&
            bid.recipient == expectedBid_.recipient,
            "Market: unexpected bid"
        );
        require(
            isValidBid(tokenId_, bid.amount),
            "Market: invalid Bid for share-splitting"
        );

        _finalizeTransfer(tokenId_, bid.bidder);
    }

    function setBidShares(
        uint256 tokenId_,
        BidShares memory bidShares_
    )
        external
        override
        onlyProduct
    {
        require(
            areValidBidShares(bidShares_),
            "Market: invalid bid shares, must sum to 100"
        );
        _bidShares[tokenId_] = bidShares_;
        emit BidShareUpdated(tokenId_, bidShares_);
    }

    function getBidFromBidder(
        uint256 tokenId_,
        address bidder_
    )
        external
        view
        override
        returns (Bid memory)
    {
        return _bidders[tokenId_][bidder_];
    }

    function currentAskForToken(
        uint256 tokenId_
    )
        external
        view
        override
        returns (Ask memory)
    {
        return _asks[tokenId_];
    }

    function bidSharesForToken(
        uint256 tokenId_
    )
        public
        view
        override
        returns (BidShares memory)
    {
        return _bidShares[tokenId_];
    }

    function isValidBid(
        uint256 tokenId_,
        uint256 bidAmount_
    )
        public
        view
        override
        returns (bool)
    {
        BidShares memory bidShares = bidSharesForToken(tokenId_);
        require(
            areValidBidShares(bidShares),
            "Market: invalid bid shares, must sum to 100"
        );

        return bidAmount_ != 0 &&
            bidAmount_ == splitShare(bidShares.creator, bidAmount_)
                + splitShare(bidShares.previousOwner, bidAmount_)
                + splitShare(bidShares.owner, bidAmount_);
    }

    function areValidBidShares(
        BidShares memory bidShares_
    )
        public
        pure
        override
        returns (bool)
    {
        return bidShares_.creator.value +
            bidShares_.owner.value +
            bidShares_.previousOwner.value == uint256(100) * Decimal.BASE;
    }

    function splitShare(
        Decimal.D256 memory sharePercent_,
        uint256 amount_
    )
        public
        pure
        override
        returns (uint256)
    {
        return Decimal.mul(amount_, sharePercent_) / 100;
    }

    function pause()
        external
        virtual
        onlyProduct
    {
        _pause();
    }

    function unpause()
        external
        virtual
        onlyProduct
    {
        _unpause();
    }

    function _canAcceptBidAutomatically(
        uint256 tokenId_,
        Bid calldata bid_
    )
        internal
        view
        returns (bool)
    {
        return _asks[tokenId_].currency != address(0) &&
            bid_.currency == _asks[tokenId_].currency &&
            bid_.amount >= _asks[tokenId_].amount;
    }

    function _finalizeTransfer(
        uint256 tokenId_,
        address bidder_
    )
        private
    {
        Bid memory bid = _bidders[tokenId_][bidder_];
        BidShares storage bidShares = _bidShares[tokenId_];

        IERC20 token = IERC20(bid.currency);

        // Transfer bid share to current Product owner.
        token.transfer(
            IERC721(product).ownerOf(tokenId_),
            splitShare(bidShares.owner, bid.amount)
        );

        // Transfer bid share to Product creator.
        token.transfer(
            Product(product).creator(),
            splitShare(bidShares.creator, bid.amount)
        );

        // Transfer media to bid recipient.
        Product(product).transferAfterAuction(tokenId_, bid.recipient);

        // Calculate bid share for new owner.
        // Equals (100 - creatorShare - sellOnShare).
        bidShares.owner = Decimal.D256(
            (uint(100) * Decimal.BASE)
            - _bidShares[tokenId_].creator.value
            - bid.sellOnShare.value
        );

        // Set previous owner share (== accepted bid's sell-on fee)
        bidShares.previousOwner = bid.sellOnShare;

        // Remove accepted bid.
        delete _bidders[tokenId_][bidder_];

        emit BidShareUpdated(tokenId_, bidShares);
        emit BidFinalized(tokenId_, bid);
    }
}

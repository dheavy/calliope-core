// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "../lib/Decimal.sol";

interface IMarket {
    struct Bid {
        uint256 amount;
        address currency;
        address bidder;
        address recipient;
        Decimal.D256 sellOnShare;
    }

    struct Ask {
        uint256 amount;
        address currency;
    }

    struct BidShares {
        Decimal.D256 previousOwner;
        Decimal.D256 creator;
        Decimal.D256 owner;
    }

    event BidCreated(uint256 indexed tokenId_, Bid bid_);
    event BidRemoved(uint256 indexed tokenId_, Bid bid_);
    event BidFinalized(uint256 indexed tokenId_, Bid bid_);
    event AskCreated(uint256 indexed tokenId_, Ask ask_);
    event AskRemoved(uint256 indexed tokenId_, Ask ask_);
    event BidShareUpdated(uint256 indexed tokenId_, BidShares bidShares_);

    function setAsk(
        uint256 tokenId_,
        Ask calldata ask_
    )
        external;

    function removeAsk(
        uint256 tokenId_
    )
        external;

    function setBid(
        uint256 tokenId_,
        Bid calldata bid_,
        address from_
    )
        external;

    function removeBid(
        uint256 tokenId_,
        address bidder_
    )
        external;

    function acceptBid(
        uint256 tokenId_,
        Bid calldata expectedBid_
    )
        external;

    function setBidShares(
        uint256 tokenId_,
        BidShares memory bidShares_
    )
        external;

    function getBidFromBidder(
        uint256 tokenId_,
        address bidder_
    )
        external
        view
        returns (Bid memory);

    function currentAskForToken(
        uint256 tokenId_
    )
        external
        view
        returns (Ask memory);

    function bidSharesForToken(
        uint256 tokenId_
    )
        external
        view
        returns (BidShares memory);

    function isValidBid(
        uint256 tokenId_,
        uint256 bidAmount_
    )
        external
        view
        returns (bool);

    function areValidBidShares(
        BidShares memory bidShares_
    )
        external
        pure
        returns (bool);

    function splitShare(
        Decimal.D256 calldata sharePercent_,
        uint256 amount_
    )
        external
        pure
        returns (uint256);
}

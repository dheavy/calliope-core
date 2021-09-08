// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/IMarket.sol";
import "./interfaces/IProduct.sol";
import "./Market.sol";

/*
    TestMarketProxy is only to be used for TEST purposes.
    Use this contract when testing Market contract.

    Testing Market contract testing is complex due to the fact Market contracts
    ought to be deployed from Product contract. This rule is enforced by the existence
    of a modifier on Market, reverting calls on some external methods from the contract
    if they were not invoked by the parent Product contract.

    TestMarketProxy provides tests with prepared Market instance setting the appropriate
    contract-to-contract relationship, as well as proxy methods (prefixed with "market",
    e.g. "marketSetBidShares") to call on methods of the Market instance, passing the protection
    of the Product-enforcer modifier.

    i.e. instead of calling "market.setBidShares", invoked "testMarketProxy.marketSetBidShares"
    with the same signature.
*/

contract TestMarketProxy is
    ERC721,
    IProduct,
    AccessControlEnumerable
{
    bytes32 public constant PRODUCT_OWNER_ROLE = keccak256("PRODUCT_OWNER_ROLE");

    address public market;

    constructor(
        address currency_,
        IMarket.Fee memory fee_
    )
        ERC721("Product", "PRD")
    {
        _setupRole(PRODUCT_OWNER_ROLE, _msgSender());
        market = address(new Market(address(this), currency_, fee_));
    }

    function marketSetBidShares(
        uint256 tokenId_,
        IMarket.BidShares memory bidShares_
    )
        external
    {
        IMarket(market).setBidShares(tokenId_, bidShares_);
    }

    function marketSetBid(
        uint256 tokenId_,
        IMarket.Bid calldata bid_,
        address from_
    )
        external
    {
        IMarket(market).setBid(tokenId_, bid_, from_);
    }

    function marketSetAsk(
        uint256 tokenId_,
        IMarket.Ask calldata ask_
    )
        external
    {
        IMarket(market).setAsk(tokenId_, ask_);
    }

    function marketRemoveAsk(
        uint256 tokenId_
    )
        external
    {
        IMarket(market).removeAsk(tokenId_);
    }

    function areValidBidShares(
        IMarket.BidShares memory bidShares_
    )
        public
        view
        returns (bool)
    {
        return IMarket(market).areValidBidShares(bidShares_);
    }

    function splitShare(
        Decimal.D256 memory sharePercent_,
        uint256 amount_
    )
        public
        view
        returns (uint256)
    {
        return IMarket(market).splitShare(sharePercent_, amount_);
    }

    function isValidBid(
        uint256 tokenId_,
        uint256 bidAmount_
    )
        public
        view
        returns (bool)
    {
        return IMarket(market).isValidBid(tokenId_, bidAmount_);
    }

    function fee()
        external
        view
        returns (IMarket.Fee memory)
    {
        return IMarket(market).fee();
    }

    function mintNFT(
        uint256 tokenId_
    )
        external
    {
        _safeMint(_msgSender(), tokenId_);
    }

    function creator()
        view
        public
        override
        returns (address)
    {
        return getRoleMember(PRODUCT_OWNER_ROLE, 0);
    }

    function setAsk(uint256 tokenId_, IMarket.Ask memory ask_) external override {}
    function removeAsk(uint256 tokenId_) external override {}
    function mint(string calldata baseTokenURI_, IMarket.BidShares memory bidShares_) external override {}
    function setBid(uint256 tokenId_, IMarket.Bid calldata bid) external override {}
    function acceptBid(uint256 tokenId_, IMarket.Bid memory bid_) external override {}
    function removeBid(uint256 tokenId_) external override {}
    function updateTokenURI(uint256 tokenId_, string calldata tokenURI_) external override {}
    function transferAfterAuction(uint256 tokenId_, address to_) external override {}
    function lend(uint256 tokenId_) external override {}
    function recover(uint256 tokenId_) external override {}

    function supportsInterface(
        bytes4 interfaceId_
    )
        public
        view
        virtual
        override(
            AccessControlEnumerable,
            ERC721
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId_);
    }
}

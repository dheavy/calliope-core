// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./IMarket.sol";

interface IProduct {
    struct ProductData {
        string name;
        string symbol;
        string sku;
    }

    event TokenURIUpdated(uint256 indexed tokenId_, address owner_, string uri_);
    event TokenMetadataURIUpdated(uint256 indexed tokenId_, address owner_, string uri_);

    function mint(
        string calldata baseTokenURI_,
        IMarket.BidShares memory bidShares_
    )
        external;

    function setAsk(
        uint256 tokenId_,
        IMarket.Ask memory ask_
    )
        external;

    function removeAsk(
        uint256 tokenId_
    )
        external;

    function setBid(
        uint256 tokenId_,
        IMarket.Bid calldata bid
    )
        external;

    function acceptBid(
        uint256 tokenId_,
        IMarket.Bid memory bid_
    )
        external;

    function removeBid(
        uint256 tokenId_
    )
        external;

    function updateTokenURI(
        uint256 tokenId_,
        string calldata tokenURI_
    )
        external;

    function transferAfterAuction(
        uint256 tokenId_,
        address to_
    )
        external;
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

interface IProduct {
    struct ProductData {
        string name;
        string symbol;
        string sku;
    }

    function transferAfterAuction(uint256 tokenId_, address to_) external;
}

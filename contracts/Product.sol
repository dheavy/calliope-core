// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "./interfaces/IProduct.sol";
import "./lib/StringUtils.sol";
import "./Market.sol";

contract Product is
    IProduct,
    Context,
    AccessControlEnumerable,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    ERC721Pausable
{
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Mapping of token IDs to Market contract addresses
    // (each token is linked to its own Market).
    mapping (uint256 => address) public markets;

    // Mapping of token IDs to address of previous owner
    // (when transfering ownership, we need a reference to the previous owners
    // to distribute their share of the bid).
    mapping(uint256 => address) public previousOwners;

    mapping(uint256 => bool) public lendings;

    address public creator;

    string public sku;

    uint16 public totalStock;

    Counters.Counter internal _tokenIdTracker;

    modifier onlyApprovedOrOwner(
        address spender,
        uint256 tokenId_
    ) {
        require(
            _isApprovedOrOwner(spender, tokenId_),
            "Product: owner or approved only"
        );
        _;
    }

    modifier onlyExistingToken(
        uint256 tokenId_
    ) {
        require(
            _exists(tokenId_),
            "Product: invalid token"
        );
        _;
    }

    constructor(
        ProductData memory product_,
        uint16 totalStock_
    )
        ERC721(product_.name, product_.symbol)
    {
        require(
            !StringUtils.isEmptyString(product_.sku),
            "Product: sku cannot be an empty string"
        );
        require(
            // uint16 limit -> 2**16 - 1 => 65535
            // Set a lower value for readibility => 60000
            totalStock_ >= 1 && totalStock_ <= 60000,
            "Product: total stock must be >= 1 and <= 60000"
        );

        totalStock = totalStock_;
        sku = product_.sku;
        creator = _msgSender();

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
    }

    function pause()
        public
        virtual
    {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "Product: cannot pause"
        );
        _pause();
    }

    function unpause()
        public
        virtual
    {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "Product: cannot unpause"
        );
        _unpause();
    }

    function mint(
        string calldata baseTokenURI_,
        IMarket.BidShares memory bidShares_
    )
        external
        override
        whenNotPaused
    {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Product: cannot mint"
        );
        require(
            _tokenIdTracker.current() + 1 <= totalStock,
            "Product: no mint left"
        );

        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        uint256 currentTokenId = _tokenIdTracker.current();
        _safeMint(_msgSender(), currentTokenId);
        _createMarket(_msgSender(), currentTokenId);
        _setTokenURI(
            currentTokenId,
            string(abi.encodePacked(baseTokenURI_, currentTokenId.toString()))
        );
        _tokenIdTracker.increment();
        previousOwners[currentTokenId] = _msgSender();
        IMarket(markets[currentTokenId]).setBidShares(currentTokenId, bidShares_);
    }

    function supportsInterface(
        bytes4 interfaceId_
    )
        public
        view
        virtual
        override(
            AccessControlEnumerable,
            ERC721,
            ERC721Enumerable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId_);
    }

    function setAsk(
        uint256 tokenId_,
        IMarket.Ask memory ask_
    )
        external
        override
        whenNotPaused
        onlyApprovedOrOwner(msg.sender, tokenId_)
    {
        IMarket(markets[tokenId_]).setAsk(tokenId_, ask_);
    }

    function acceptBid(
        uint256 tokenId_,
        IMarket.Bid memory bid_
    )
        external
        override
        whenNotPaused
        onlyApprovedOrOwner(msg.sender, tokenId_)
    {
        IMarket(markets[tokenId_]).acceptBid(tokenId_, bid_);
    }

    function removeBid(
        uint256 tokenId_
    )
        external
        override
        whenNotPaused
    {
        IMarket(markets[tokenId_]).removeBid(tokenId_, _msgSender());
    }

    function setBid(
        uint256 tokenId_,
        IMarket.Bid memory bid_
    )
        external
        override
        whenNotPaused
        onlyExistingToken(tokenId_)
    {
        require(
            _msgSender() == bid_.bidder,
            "Market: invalid bidder"
        );
        IMarket(markets[tokenId_]).setBid(tokenId_, bid_, _msgSender());
    }

    function transferAfterAuction(
        uint256 tokenId_,
        address to_
    )
        external
        override
        whenNotPaused
        onlyExistingToken(tokenId_)
        onlyApprovedOrOwner(msg.sender, tokenId_)
    {
        previousOwners[tokenId_] = ownerOf(tokenId_);
        _safeTransfer(ownerOf(tokenId_), to_, tokenId_, "");
    }

    function updateTokenURI(
        uint256 tokenId_,
        string calldata baseTokenURI_
    )
        external
        override
        onlyApprovedOrOwner(msg.sender, tokenId_)
        onlyExistingToken(tokenId_)
    {
        require(
            _exists(tokenId_),
            "Product: invalid token ID"
        );
        _setTokenURI(tokenId_, string(abi.encodePacked(baseTokenURI_, tokenId_.toString())));
    }

    function tokenURI(
        uint256 tokenId_
    )
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        onlyExistingToken(tokenId_)
        returns (string memory)
    {
        return super.tokenURI(tokenId_);
    }

    function burn(
        uint256 tokenId_
    )
        public
        virtual
        whenNotPaused
        override(ERC721Burnable)
        onlyApprovedOrOwner(msg.sender, tokenId_)
        onlyExistingToken(tokenId_)
    {
        _burn(tokenId_);
    }

    function removeAsk(
        uint256 tokenId_
    )
        external
        override
        whenNotPaused
        onlyExistingToken(tokenId_)
        onlyApprovedOrOwner(msg.sender, tokenId_)
    {
        IMarket(markets[tokenId_]).removeAsk(tokenId_);
    }

    function lend(
        uint256 tokenId_
    )
        external
        override
        whenNotPaused
    {
        require(
            lendings[tokenId_] == false,
            "Product: already lent"
        );
        lendings[tokenId_] = true;
        Market(markets[tokenId_]).pause();
    }

    function recover(
        uint256 tokenId_
    )
        external
        override
        whenNotPaused
    {
        require(
            lendings[tokenId_] == true,
            "Product: not lent"
        );
        lendings[tokenId_] = false;
        Market(markets[tokenId_]).unpause();
    }

    function _createMarket(
        address owner_,
        uint256 tokenId_
    )
        internal
    {
        require(
            markets[tokenId_] == address(0),
            "Product: Market exists"
        );
        markets[tokenId_] = address(new Market(address(this), owner_));
    }

    function _beforeTokenTransfer(
        address from_,
        address to_,
        uint256 tokenId_
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
    {
        super._beforeTokenTransfer(from_, to_, tokenId_);
    }

    function _burn(
        uint256 tokenId_
    )
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId_);
    }
}

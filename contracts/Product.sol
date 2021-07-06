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
import "./lib/Utils.sol";

contract Product is
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
    mapping(uint256 => address) public previousOwner;
    string public sku;

    Counters.Counter internal _tokenIdTracker;
    address internal _storeContract;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory sku_
    )
        ERC721(name_, symbol_)
    {
        require(
            !Utils.isEmptyString(sku_),
            "Product: sku cannot be an empty string"
        );

        sku = sku_;

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
        address storeContract_,
        string calldata baseTokenURI_
    )
        public
    {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Product: cannot mint"
        );
        require(
            storeContract_ != address(0),
            "Product: Store contract address cannot be 0x0"
        );

        _storeContract = storeContract_;

        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        uint256 currentTokenId = _tokenIdTracker.current();
        _safeMint(_storeContract, currentTokenId);
        _setTokenURI(
            _tokenIdTracker.current(),
            string(abi.encodePacked(baseTokenURI_, currentTokenId.toString()))
        );

        _tokenIdTracker.increment();
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

    function transferAfterAuction(
        uint256 tokenId_,
        address to_
    )
        external
    {
        // require(msg.sender == marketContract, "Product: callable from Market only");
        require(
            _isApprovedOrOwner(_msgSender(), tokenId_),
            "Product: owner or approved only"
        );
        previousOwner[tokenId_] = ownerOf(tokenId_);
        _safeTransfer(ownerOf(tokenId_), to_, tokenId_, "");
    }

    function updateTokenURI(
        uint256 tokenId_,
        string calldata baseTokenURI_
    )
        external
    {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId_),
            "Product: owner or approved only"
        );
        require(
            _exists(tokenId_),
            "Product: token ID does not exist"
        );
        _setTokenURI(tokenId_, string(abi.encodePacked(baseTokenURI_, tokenId_.toString())));
    }


    function tokenURI(
        uint256 tokenId
    )
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from_,
        address to_,
        uint256 tokenId_
    )
        internal
        virtual
        override(ERC721, ERC721Enumerable, ERC721Pausable)
    {
        super._beforeTokenTransfer(from_, to_, tokenId_);
    }

    function _burn(
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}

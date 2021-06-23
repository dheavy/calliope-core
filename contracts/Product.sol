// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Product is Context, AccessControlEnumerable, ERC721Enumerable, ERC721Burnable, ERC721Pausable  {

    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    string public sku;

    Counters.Counter private _tokenIdTracker;

    string private _baseTokenURI;
    address private _storeContract;
    bool private _isMinted;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_,
        string memory sku_
    )
        ERC721(name_, symbol_)
    {
        require(
            !_isEmptyString(sku_),
            "Product: SKU cannot be an empty string"
        );

        _baseTokenURI = baseTokenURI_;
        sku = sku_;

        _isMinted = false;

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
            "Product: must have pauser role to pause"
        );
        _pause();
    }

    function unpause()
        public
        virtual
    {
        require(
            hasRole(PAUSER_ROLE, _msgSender()),
            "Product: must have pauser role to unpause"
        );
        _unpause();
    }

    function mint(
        address storeContract_
    )
        public
        virtual
    {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Product: must have minter role to mint"
        );
        require(
            storeContract_ != address(0),
            "Product: Store contract address cannot be 0x0"
        );
        require(
            _isMinted == false,
            "Product: a token already exists with this SKU"
        );

        _isMinted = true;
        _storeContract = storeContract_;

        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        _safeMint(_storeContract, _tokenIdTracker.current(), abi.encodePacked(sku));
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

    function _baseURI()
        internal
        view
        virtual
        override
        returns (string memory)
    {
        return _baseTokenURI;
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

    function _isEmptyString(
        string memory str_
    )
        internal
        pure
        returns (bool)
    {
        bytes memory testable = bytes(str_);

        if (testable.length == 0) {
            return true;
        }
        return false;
    }
}

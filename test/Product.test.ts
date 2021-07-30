import Chance from 'chance';
import { ethers } from 'hardhat';
import asPromised from 'chai-as-promised';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  expect,
  use
} from 'chai';
import {
  Contract,
  ContractFactory
} from 'ethers';
import {
  smockit,
  MockContract
} from '@eth-optimism/smock';

use(asPromised);

const chance = new Chance();
let ProductFactory: ContractFactory;
let StringUtilsFactory: ContractFactory;

describe('Product', () => {
  type ProductDataStruct = {
    name: string;
    symbol: string;
    sku: string;
  };
  let productData: ProductDataStruct;
  let product: Contract;
  let StringUtils: Contract;
  let MockStringUtils: MockContract;
  let sku: string;
  let name: string;
  let symbol: string;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();

    StringUtilsFactory = await ethers.getContractFactory('StringUtils', signers[0]);
    StringUtils = await StringUtilsFactory.deploy();

    MockStringUtils = await smockit(StringUtils);
    MockStringUtils.smocked.isEmptyString.will.return.with((str: string) => str === '');

    ProductFactory = await ethers.getContractFactory(
      'Product',
      {
        signer: signers[0],
        libraries: {
          StringUtils: MockStringUtils.address
        }
      }
    );

    name = chance.sentence({ words: 3 });
    sku = chance.word();
    symbol = chance.word({
      length: chance.natural({ min: 1, max: 5 })
    }).toUpperCase();

    productData = { name, symbol, sku };

    product = await ProductFactory.deploy(productData, 5);
  });

  describe('#constructor', () => {
    it('should be able to deploy', async () => {
      await expect(ProductFactory.deploy(productData, 1))
        .eventually.fulfilled;
    });

    it('should have "name" specified in the constructor, ERC721 style', async () => {
      expect(product.name).to.exist;
      await expect(product.name()).to.eventually.eq(name);
    });

    it('should have "symbol" specified in the constructor, ERC721 style', async () => {
      expect(product.symbol).to.exist;
      await expect(product.symbol()).to.eventually.eq(symbol);
    });
    it('should revert if "sku" is missing in the constructor', async () => {
      await expect(ProductFactory.deploy({ name, symbol, sku: null }, 1))
        .to.eventually.be.rejectedWith("Cannot read property 'length' of null");
    });

    it('should revert if "sku" is not a string in the constructor', async () => {
      await expect(ProductFactory.deploy({ name, symbol, sku: [] }, 1))
        .to.eventually.be.rejectedWith('Product: sku cannot be an empty string');

      await expect(ProductFactory.deploy({ name, symbol, sku: 0 }, 1))
        .to.eventually.be.rejectedWith('Product: sku cannot be an empty string');
    });

    it('should revert if "sku" is an empty string in the constructor', async () => {
      await expect(ProductFactory.deploy({ name, symbol, sku: '' }, 1))
        .to.eventually.be.rejectedWith('Product: sku cannot be an empty string');
    });

    it('should deploy even if "sku" is a spaces-filled string in the constructor', async () => {
      await expect(ProductFactory.deploy({ name, symbol, sku: ' ' }, 1))
        .to.eventually.be.fulfilled;
    });

    it('should revert if totalStock passed in constructor is below 1 or above 60000', async () => {
      await expect(ProductFactory.deploy(productData, 0))
        .to.eventually.be.rejectedWith('Product: total stock must be >= 1 and <= 60000');

      await expect(ProductFactory.deploy(productData, 60001))
        .to.eventually.be.rejectedWith('Product: total stock must be >= 1 and <= 60000');

      await expect(ProductFactory.deploy(productData, 1))
        .to.eventually.be.fulfilled;

      await expect(ProductFactory.deploy(productData, 60000))
        .to.eventually.be.fulfilled;
    });

    it('should not be paused', async () => {
      const isPaused = await product.paused();
      expect(isPaused).to.be.false;
    });
  });

  describe('#pause', () => {
    it('should set deployer account as pauser role by default', async () => {
      const deployer = signers[0];
      await product.connect(deployer).pause();
      const isPaused = await product.paused();
      expect(isPaused).to.eq(true);
    });

    it('should revert if pause is attempted from a non-pauser role', async () => {
      const unableToPause = signers[1];

      await expect(product.connect(unableToPause).pause())
        .to.eventually.be.rejectedWith('Product: cannot pause');
    });

    it('should pause if invoked by account with pauser role', async () => {
      await product.pause();
      const isPaused = await product.paused();
      expect(isPaused).to.eq(true);
    });

    it('should revert if pause is attempted on already paused contract', async () => {
      await product.pause();
      await expect(product.pause()).to.eventually.be.rejectedWith('Pausable: paused');
    });
  });

  describe('#unpause', () => {
    it('should revert if unpause is attempted from a non-pauser role', async () => {
      const unableToUnpause = signers[1];

      await expect(product.connect(unableToUnpause).unpause())
        .to.eventually.be.rejectedWith('Product: cannot unpause');
    });

    it('should unpause if invoked by account with pauser role', async () => {
      await product.pause();
      await expect(product.paused()).to.eventually.eq(true);
      await product.unpause();
      await expect(product.paused()).to.eventually.eq(false);
    });

    it('should revert if unpause is attempted on already unpaused contract', async () => {
      await product.pause();
      await product.unpause();
      await expect(product.unpause()).to.eventually.be.rejectedWith('Pausable: not paused');
    });
  });

  describe('#mint', () => {
    it('should set deployer as minter role by default', async () => {
      const deployer = signers[0];
      await expect(product.connect(deployer).mint(''))
        .to.be.eventually.fulfilled;
    });

    it('should revert if attempted from non-minter role', async () => {
      const cannotMint = signers[1];
      await expect(product.connect(cannotMint).mint(''))
        .to.be.eventually.rejectedWith('Product: cannot mint');
    });

    it('should revert if missing argument baseTokenURI', async () => {
      await expect(product.connect(signers[0]).mint())
        .to.be.eventually.rejected;
    });

    it('should set the token URI', async () => {
      const tokenId = 0;
      const baseURI = 'ipfs://foo.bar/';
      const tokenURI = baseURI + tokenId;
      await product.mint(baseURI);

      await expect(product.tokenURI(tokenId))
        .to.eventually.eq(tokenURI);
    });

    it('should emit a Transfer event', async () => {
      const tokenId = 0;
      await expect(product.mint(''))
        .to.emit(product, 'Transfer')
        .withArgs(ethers.constants.AddressZero, signers[0].address, tokenId);
    });
  });

  describe('#supportsInterface', () => {
    /**
     *     See https://eips.ethereum.org/EIPS/eip-165
     *         https://eips.ethereum.org/EIPS/eip-721
     *
     *     bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *     bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *     bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
     *     bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
     *
     *     => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *        0xa22cb465 ^ 0xe985e9c5 ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    const _INTERFACE_ID_ERC721 = '0x80ac58cd';

    /*
    *     bytes4(keccak256('totalSupply()')) == 0x18160ddd
    *     bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) == 0x2f745c59
    *     bytes4(keccak256('tokenByIndex(uint256)')) == 0x4f6ccce7
    *
    *     => 0x18160ddd ^ 0x2f745c59 ^ 0x4f6ccce7 == 0x780e9d63
    */
    const _INTERFACE_ID_ERC721_ENUMERABLE = '0x780e9d63';

    /*
    *      bytes4(keccak256('name()')) == 0x06fdde03
    *      bytes4(keccak256('symbol()')) == 0x95d89b41
    *      bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
    *      bytes4(keccak256('tokenMetadataURI(uint256)')) == 0x157c3df9
    *
    *      0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd ^ 0x157c3df9 == 0x4e222e66
    */
    const _INTERFACE_ID_ERC721_METADATA = '0x4e222e66';

    it('should state it supports ERC-721 through supportsInterface()', async () => {
      await expect(product.supportsInterface(_INTERFACE_ID_ERC721))
        .to.eventually.eq(true);
    });

    it('should state it supports ERC-721 enumerable through supportsInterface()', async () => {
      await expect(product.supportsInterface(_INTERFACE_ID_ERC721_ENUMERABLE))
        .to.eventually.eq(true);
    });

    it('should state it supports ERC-721 metadata through supportsInterface()', async () => {
      await expect(product.supportsInterface(_INTERFACE_ID_ERC721_METADATA))
        .to.eventually.eq(false);
    });
  });

  // describe('#transferAfterAuction', () => {
  //   it('should revert if invoked by non-owner or non-approved', async () => {
  //     const owner = signers[0];
  //     const approved = signers[1];
  //     const willFail = signers[2];
  //     const transferTo = signers[3];

  //     await product.setApprovalForAll(approved.address, true);
  //     await product.mint('');

  //     await expect(product.connect(willFail).transferAfterAuction(0, transferTo.address))
  //       .to.eventually.be.rejectedWith('Product: owner or approved only');

  //     await expect(product.connect(approved).transferAfterAuction(0, owner.address))
  //       .to.eventually.be.fulfilled;

  //       await expect(product.connect(owner).transferAfterAuction(0, approved.address))
  //       .to.eventually.be.fulfilled;
  //   });

  //   it('should transfer ownership', async () => {
  //     const firstOwner = signers[0];
  //     const secondOwner = signers[1];

  //     await product.mint('');

  //     await product.transferAfterAuction(0, secondOwner.address);
  //     await expect(product.previousOwners(0))
  //       .to.eventually.eq(firstOwner.address);

  //     await product.connect(secondOwner).transferAfterAuction(0, firstOwner.address);
  //     await expect(product.previousOwners(0))
  //       .to.eventually.eq(secondOwner.address);
  //   });
  // });

  describe('#tokenURI', () => {
    it('should return the full token URI', async () => {
      const tokenId = 0;
      const baseURI = 'ipfs://foo.bar/';
      const tokenURI = baseURI + tokenId;

      const owner = signers[0];
      await product.mint(baseURI);

      await expect(product.tokenURI(tokenId))
        .to.eventually.eq(tokenURI);

      await expect(product.connect(signers[0]).tokenURI(tokenId))
        .to.eventually.eq(tokenURI)
    });
  });

  describe('#updateTokenURI', () => {
    it('should revert if invoked by non-owner or non-approved', async () => {
      const owner = signers[0];
      const approved = signers[1];
      const willFail = signers[2];

      await product.setApprovalForAll(approved.address, true);
      await product.mint('');

      await expect(product.connect(willFail).updateTokenURI(0, 'foo'))
        .to.eventually.be.rejectedWith('Product: owner or approved only');

      await expect(product.connect(owner).updateTokenURI(0, 'foo'))
        .to.eventually.be.fulfilled;

      await expect(product.connect(approved).updateTokenURI(0, 'foo'))
        .to.eventually.be.fulfilled;
    });

    it('should update the full token URI by changing the URI base', async () => {
      const tokenId = 0;
      const baseURI = 'ipfs://foo.bar/';
      const tokenURI = baseURI + tokenId;

      await product.mint('');

      await expect(product.tokenURI(tokenId))
        .to.eventually.eq(tokenId.toString());

      await product.updateTokenURI(0, baseURI);

      await expect(product.tokenURI(tokenId))
        .to.eventually.eq(tokenURI);
    });
  });

  describe('#burn', () => {
    it('should revert if invoked by non-owner or non-approved', async () => {
      const owner = signers[0];
      const approved = signers[1];
      const willFail = signers[2];

      await product.setApprovalForAll(approved.address, true);

      await product.mint('');
      await expect(product.connect(willFail).burn(0))
        .to.eventually.be.rejectedWith('Product: owner or approved only');

      await product.mint('');
      await expect(product.connect(owner).burn(1))
        .to.eventually.be.fulfilled;

      await product.mint('');
      await expect(product.connect(approved).burn(2))
        .to.eventually.be.fulfilled;
    });
  });
});

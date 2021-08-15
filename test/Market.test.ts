import { ethers } from 'hardhat';
import crypto from 'crypto';
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

describe('Market', () => {
  let MarketFactory: ContractFactory;
  let ProductFactory: ContractFactory;
  let StringUtilsFactory: ContractFactory;
  let stringUtils: Contract;
  let market: Contract;
  let product: Contract;
  let mockStringUtils: MockContract;
  let mockProduct: MockContract;
  let signers: SignerWithAddress[];
  let erc20TokenContractAddress: string;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    erc20TokenContractAddress = new ethers.Wallet(
      `0x${crypto.randomBytes(32).toString('hex')}`
    ).address;

    StringUtilsFactory = await ethers.getContractFactory('StringUtils', signers[0]);
    stringUtils = await StringUtilsFactory.deploy();
    mockStringUtils = await smockit(stringUtils);
    mockStringUtils.smocked.isEmptyString.will.return.with((str: string) => str === '');

    ProductFactory = await ethers.getContractFactory(
      'Product',
      {
        signer: signers[0],
        libraries: {
          StringUtils: mockStringUtils.address
        }
      }
    );
    product = await ProductFactory.deploy({ name: 'Product', symbol: 'PRD', sku: 'prd-001'}, 1);
    mockProduct = await smockit(product);

    MarketFactory = await ethers.getContractFactory('Market', signers[0]);
    market = await MarketFactory.deploy(product.address, erc20TokenContractAddress);
  });

  describe('#constructor', () => {
    it('should be able to deploy', async () => {
      await expect(MarketFactory.deploy(product.address, erc20TokenContractAddress))
        .eventually.fulfilled;
    });

    it('specify "product" address in constructor', async () => {
      expect(market.product).to.exist;
      await expect(market.product()).to.eventually.eq(product.address)
    });
  });

  describe('#setAsk', () => {

  });
});

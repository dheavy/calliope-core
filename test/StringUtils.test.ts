import { ethers } from 'hardhat';
import { expect, use } from 'chai';
import asPromised from 'chai-as-promised';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

use(asPromised);

describe('StringUtils', () => {
  let StringUtilsFactory: ContractFactory;
  let signers: SignerWithAddress[];
  let StringUtils: Contract;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    StringUtilsFactory = await ethers.getContractFactory('StringUtils',signers[0]);
    StringUtils = await StringUtilsFactory.deploy();
  });

  describe('#isEmptyString', () => {
    it("should return true when passed argument is an empty string", async () => {
      await expect(StringUtils.isEmptyString(""))
        .to.eventually.be.fulfilled;
    });

    it("should return false when passed argument is a non empty string", async () => {
      await expect(StringUtils.isEmptyString(" "))
        .to.eventually.be.fulfilled;

      await expect(StringUtils.isEmptyString("foo"))
        .to.eventually.be.fulfilled;
    });
  });

  describe('#areStringEquals', () => {
    it('should return true if arguments are equal when cast to strings', async () => {
      await expect(StringUtils.areStringEquals('foo', 'foo'))
        .to.eventually.eq(true);

      await expect(StringUtils.areStringEquals('', ''))
        .to.eventually.eq(true);

      await expect(StringUtils.areStringEquals(' ', ' '))
        .to.eventually.eq(true);

      await expect(StringUtils.areStringEquals(0, 0))
        .to.eventually.eq(true);

      await expect(StringUtils.areStringEquals(0, ''))
        .to.eventually.eq(true);
    });

    it('should return false if arguments are not equal when cast to strings', async () => {
      await expect(StringUtils.areStringEquals('fooo', 'foo'))
        .to.eventually.eq(false);

      await expect(StringUtils.areStringEquals('0', 0))
        .to.eventually.eq(false);

      await expect(StringUtils.areStringEquals(' ', ''))
        .to.eventually.eq(false);

      await expect(StringUtils.areStringEquals('0', '0 '))
        .to.eventually.eq(false);
    });
  });
});

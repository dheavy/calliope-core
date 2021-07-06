import { ethers } from 'hardhat';
import { expect, use } from 'chai';
import asPromised from 'chai-as-promised';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

use(asPromised);

describe('Utils', () => {
  let UtilsFactory: ContractFactory;
  let signers: SignerWithAddress[];
  let Utils: Contract;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    UtilsFactory = await ethers.getContractFactory('Utils',signers[0]);
    Utils = await UtilsFactory.deploy();
  });

  describe('#isEmptyString', () => {
    it("should return true when passed argument is an empty string", async () => {
      await expect(Utils.isEmptyString(""))
        .to.eventually.be.fulfilled;
    });

    it("should return false when passed argument is a non empty string", async () => {
      await expect(Utils.isEmptyString(" "))
        .to.eventually.be.fulfilled;

      await expect(Utils.isEmptyString("foo"))
        .to.eventually.be.fulfilled;
    });
  });

  describe('#areStringEquals', () => {
    it('should return true if arguments are equal when cast to strings', async () => {
      await expect(Utils.areStringEquals('foo', 'foo'))
        .to.eventually.eq(true);

      await expect(Utils.areStringEquals('', ''))
        .to.eventually.eq(true);

      await expect(Utils.areStringEquals(' ', ' '))
        .to.eventually.eq(true);

      await expect(Utils.areStringEquals(0, 0))
        .to.eventually.eq(true);

      await expect(Utils.areStringEquals(0, ''))
        .to.eventually.eq(true);
    });

    it('should return false if arguments are not equal when cast to strings', async () => {
      await expect(Utils.areStringEquals('fooo', 'foo'))
        .to.eventually.eq(false);

      await expect(Utils.areStringEquals('0', 0))
        .to.eventually.eq(false);

      await expect(Utils.areStringEquals(' ', ''))
        .to.eventually.eq(false);

      await expect(Utils.areStringEquals('0', '0 '))
        .to.eventually.eq(false);
    });
  });
});

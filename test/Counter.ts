import { ethers } from 'hardhat';
import { Counter } from '../typechain/Counter';
import chai, { expect } from 'chai';

chai.should();

describe('Counter', () => {
  let counter: Counter;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    const CounterFactory = await ethers.getContractFactory(
      'Counter',
      signers[0]
    );
    counter = (await CounterFactory.deploy()) as Counter;
    await counter.deployed();
    const initialCount = await counter.getCount();

    expect(initialCount).to.eq(0);
  });

  describe('countUp', async () => {
    it('should count up', async () => {
      await counter.countUp();
      const count = await counter.getCount();
      count.should.equal(1);
    });

    it('should emit `CountedTo` event with current value of `count`', async () => {
      const count = 1;
      await expect(counter.countUp())
        .to.emit(counter, 'CountedTo')
        .withArgs(count);
    });
  });

  describe('countDown', async () => {
    // it('should revert on underflow', async () => {
    //   await expect(counter.countDown())
    //     .to.be.revertedWith('uint256 underflow');
    // });

    it('should count down', async () => {
      await counter.countUp();
      await counter.countDown();
      const count = await counter.getCount();
      count.should.equal(0);
    });

    it('should emit `CountedTo` event with current value of `count`', async () => {
      const count = 0;
      await counter.countUp();
      await expect(counter.countDown())
        .to.emit(counter, 'CountedTo')
        .withArgs(count);
    });
  });
});

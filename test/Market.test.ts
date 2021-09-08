import { ethers } from 'hardhat';
import asPromised from 'chai-as-promised';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import Decimal from '../utils/Decimal';
import {
  BigNumber,
  BigNumberish
} from 'ethers';
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

type DecimalD256 = {
  value: BigNumber;
};

type BidShares = {
  creator: DecimalD256;
  owner: DecimalD256;
};

type Ask = {
  currency: string;
  amount: BigNumber;
};

type Bid = {
  amount: BigNumber;
  currency: string;
  bidder: string;
  recipient: string;
};

type Fee = {
  percent: DecimalD256;
  recipient: string;
};

describe('Market', () => {
  const tokenId = 0;
  let TestERC20Factory: ContractFactory;
  let TestMarketProxyFactory: ContractFactory;
  let MarketFactory: ContractFactory;
  let signers: SignerWithAddress[];
  let productAddr: string;
  let currency: string;
  let defaultBidShares: BidShares;
  let defaultAsk: Ask;
  let defaultBid: Bid;
  let defaultFee: Fee;
  let testERC20: Contract;
  let marketProxy: Contract;
  let mockMarketProxy: MockContract;
  let preparedMarket: Contract;
  let moneyMinter: SignerWithAddress;
  let serviceFeeRecipient: SignerWithAddress;
  let bidder: SignerWithAddress;
  let setAsk: Function;
  let approveERC20: Function;
  let transferERC20: Function;
  let mint: Function;

  beforeEach(async () => {
    MarketFactory = await ethers.getContractFactory('Market');
    TestERC20Factory = await ethers.getContractFactory('TestERC20');
    TestMarketProxyFactory = await ethers.getContractFactory('TestMarketProxy');

    signers = await ethers.getSigners();
    moneyMinter = signers[0];
    serviceFeeRecipient = signers[3];

    testERC20 = await TestERC20Factory
      .connect(moneyMinter)
      .deploy(Decimal.new(1000).value);

    currency = testERC20.address;

    defaultFee = {
      percent: Decimal.new(2.5),
      recipient: serviceFeeRecipient.address
    };

    marketProxy = await TestMarketProxyFactory
      .connect(moneyMinter)
      .deploy(currency, defaultFee);

    mockMarketProxy = await smockit(marketProxy);

    productAddr = await marketProxy.address;

    bidder = signers[5];

    defaultBidShares = {
      owner: Decimal.new(90),
      creator: Decimal.new(10)
    };

    defaultAsk = {
      amount: Decimal.new(100).value,
      currency
    };

    defaultBid = {
      amount: Decimal.new(50).value,
      currency,
      bidder: bidder.address,
      recipient: signers[5].address
    };

    preparedMarket = (await (async () => {
      await marketProxy.marketSetBidShares(tokenId, defaultBidShares);
      const marketAddr = await marketProxy.market();
      return (await MarketFactory.attach(marketAddr));
    })());

    setAsk = async (ask: Ask = defaultAsk) => {
      await marketProxy.marketSetAsk(tokenId, { ...ask });
    };

    approveERC20 = async (owner: SignerWithAddress, spenderAddr: string, amount: BigNumberish) => {
      await testERC20.connect(owner).approve(spenderAddr, amount);
    };

    transferERC20 = async (from: SignerWithAddress, toAddr: string, amount: BigNumberish) => {
      await testERC20.connect(from).transfer(toAddr, amount);
    };

    mint = async () => {
      await marketProxy.mintNFT(tokenId);
    };
  });

  describe('#constructor', () => {
    it('should be able to deploy', async () => {
      expect(preparedMarket).to.exist;
    });

    it('specify "product" address in constructor to be available as getter', async () => {
      await expect(preparedMarket.product()).to.eventually.eq(productAddr)
    });
  });

  describe('#areValidBidShares', () => {
    it('returns false if bid shares from a Bid, added up, do not return 100 * 10**18', async () => {
      await expect(marketProxy.areValidBidShares({ creator: Decimal.new(90), owner: Decimal.new(11) }))
        .to.eventually.be.false;

      await expect(marketProxy.areValidBidShares({ owner: Decimal.new(10), creator: Decimal.new(89) }))
        .to.eventually.be.false;
    });

    it('returns true if bid shares from a Bid, added up, do return 100 * 10**18', async () => {
      await expect(marketProxy.areValidBidShares({ creator: Decimal.new(90), owner: Decimal.new(10) }))
        .to.eventually.be.true;
    })
  });

  describe('#splitShare', () => {
    it('returns the amount, as unsigned integer, of a percentage of an original amount', async () => {
      let origAmount = BigNumber.from('100');
      let percentage = Decimal.new(33);
      let expectedAmount = 33;
      let result = await marketProxy.splitShare(percentage, origAmount);
      expect(+result.toString()).to.eq(expectedAmount);

      origAmount = BigNumber.from('1337');
      expectedAmount = 34;  // 34.762 rounded to floor integer
      percentage = Decimal.new(2.6);
      result = await marketProxy.splitShare(percentage, origAmount);
      expect(+result.toString()).to.eq(expectedAmount);
    });
  });

  describe('#isValidBid', () => {
    it('returns false if bid amount is 0', async () => {
      await expect(marketProxy.isValidBid(tokenId, 0))
        .to.eventually.be.false;
    });

    it('returns false if #areValidBidShares is false', async () => {
      mockMarketProxy.smocked.areValidBidShares.will.return.with(false);

      await expect(mockMarketProxy.isValidBid(tokenId, 10))
        .to.eventually.be.false;
    });

    it('returns true if bid amount is above 0', async () => {
      await expect(marketProxy.isValidBid(tokenId, 10))
        .to.eventually.be.true;
    });
  });

  describe('#fee', () => {
    it('returns the service fee applied in this market', async () => {
      const fee = await marketProxy.fee();
      expect(fee).to.exist;

      const { percent, recipient } = fee as Fee;
      expect(percent).to.exist;
      expect(percent.value).to.eq(defaultFee.percent.value);
      expect(recipient).to.exist;
      expect(recipient).to.eq(defaultFee.recipient);
    });
  });

  describe('#setAsk', () => {
    it('should revert if not called by parent Product', async () => {
      const market = await MarketFactory.deploy(productAddr, currency, defaultFee);
      await expect(market.setAsk(tokenId, defaultAsk))
        .to.be.rejectedWith('Market: Product call only');
    });

    it('should revert if #isValidBid is false when invoking #setAsk (e.g. Ask amount makes an invalid bid)', async () => {
      await expect(marketProxy.marketSetAsk(tokenId, { ...defaultAsk, amount: BigNumber.from(0) }))
        .to.eventually.be.rejectedWith('Market: invalid Ask');
    });

    it('should fulfill if #isValidBid is true when invoking #setAsk', async () => {
      await expect(marketProxy.marketSetAsk(tokenId, { ...defaultAsk, amount: BigNumber.from(1) }))
        .to.eventually.be.fulfilled;
    });

    it('should set the current ask for the token based on its ID', async () => {
      await setAsk();
      const currentAskForToken: Ask = await preparedMarket.currentAskForToken(tokenId);

      expect(currentAskForToken).to.exist;
      expect(parseInt(currentAskForToken.amount.toString()))
        .to.eq(parseInt(defaultAsk.amount.toString()));
      expect(currentAskForToken.currency)
        .to.eq(defaultAsk.currency);
    });

    it('should emit an AskCreated event', async () => {
      await expect(marketProxy.marketSetAsk(tokenId, defaultAsk))
        .to.emit(preparedMarket, 'AskCreated')
        .withArgs(tokenId, [defaultAsk.amount, defaultAsk.currency]);
    });
  });

  describe('#removeAsk', () => {
    beforeEach(async () => {
      await setAsk();
    });

    it('should revert if not called by parent Product', async () => {
      const market = await MarketFactory.deploy(productAddr, currency, defaultFee);
      await expect(market.removeAsk(tokenId))
        .to.be.rejectedWith('Market: Product call only');
    });

    it('should emit an AskRemoved event', async () => {
      await expect(marketProxy.marketRemoveAsk(tokenId))
        .to.emit(preparedMarket, 'AskRemoved')
        .withArgs(tokenId, [defaultAsk.amount, defaultAsk.currency]);
    });

    it('should reset Ask for the given token based on its ID', async () => {
      await marketProxy.marketRemoveAsk(tokenId);
      const currentAskForToken: Ask = await preparedMarket.currentAskForToken(tokenId);
      expect(parseInt(currentAskForToken.amount.toString())).to.equal(0);
      expect(parseInt(currentAskForToken.currency.toString())).to.equal(0);
    });
  });

  describe('#setBid', () => {
    describe('failure', () => {
      it("should revert if bidder's address is the zero address", async () => {
        const bid: Bid = { ...defaultBid, bidder: ethers.constants.AddressZero };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: invalid bidder');
      });

      it('should revert is bid amount is zero', async () => {
        const bid: Bid = { ...defaultBid, amount: Decimal.new(0).value };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: invalid bid');
      });

      it('should revert if currency in bid is the zero address', async () => {
        const bid: Bid = { ...defaultBid, currency: ethers.constants.AddressZero };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: invalid currency');
      });

      it('should revert if currency in bid is not the accepted currency for the Market', async () => {
        const bid: Bid = { ...defaultBid, currency: signers[5].address };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: currency not accepted');
      });
    });

    describe('success', () => {
      beforeEach(async () => {
        // Bidder needs money to set bid.
        expect((await testERC20.balanceOf(bidder.address)).toString()).to.eq('0');
        await transferERC20(moneyMinter, bidder.address, Decimal.new(100).value);
        expect((await testERC20.balanceOf(bidder.address)).toString()).to.eq(Decimal.new(100).value);

        // Approve contract and first signer (minter, creator...) to spend money on behalf of bidder to transfer when bid won.
        expect((await testERC20.allowance(bidder.address, preparedMarket.address)).toString()).to.eq('0');
        await approveERC20(bidder, preparedMarket.address, Decimal.new(100).value);
        expect((await testERC20.allowance(bidder.address, preparedMarket.address)).toString()).to.eq(Decimal.new(100).value);
      });

      it('should emit a "BidCreated" event when bid is validated', async () => {
        await expect(marketProxy.marketSetBid(tokenId, defaultBid, bidder.address))
          .to.emit(preparedMarket, 'BidCreated')
          .withArgs(tokenId, [
            defaultBid.amount,
            defaultBid.currency,
            defaultBid.bidder,
            defaultBid.recipient,
          ]);
      });

      it('should transfer the amount of token (currency) from bidder to Market', async () => {
        await marketProxy.marketSetBid(tokenId, defaultBid, bidder.address);
        expect((await testERC20.balanceOf(preparedMarket.address)).toString())
          .to.eq(defaultBid.amount.toString());
      });

      describe('finalizes transfer automatically if Bid matches Ask criteria', () => {
        const decimalBase = 10**18;
        let sellerSharesPercent: number;
        let creatorSharesPercent: number;
        let gainsFromSellerShares: number;
        let gainsFromCreatorShares: number;
        let gainsFromFees: number;

        let creatorAndOwner: SignerWithAddress;

        beforeEach(async () => {
          sellerSharesPercent = +defaultBidShares.owner.value.toString() / decimalBase;
          creatorSharesPercent = +defaultBidShares.creator.value.toString() / decimalBase;
          gainsFromSellerShares = (+defaultBid.amount.toString() * sellerSharesPercent) / 100;
          gainsFromCreatorShares = +defaultBid.amount.toString() - gainsFromSellerShares;
          gainsFromFees = (gainsFromSellerShares * (+defaultFee.percent.value.toString() / decimalBase)) / 100;

          creatorAndOwner = signers[0];

          await mint();
          await setAsk({ ...defaultAsk, amount: defaultBid.amount });
          await marketProxy.marketSetBidShares(tokenId, defaultBidShares);
        });

        it('should transfer expected share of sale to owner (seller), and service fees to fee recipient', async () => {
          const origOwnerBalance = +(await testERC20.balanceOf(creatorAndOwner.address)).toString();
          let expectedOwnerBalance = +(
            origOwnerBalance
            + gainsFromSellerShares     // Test user is both (first) owner...
            + gainsFromCreatorShares    // ...and creator, so expected gains are compounded...
            - gainsFromFees             // ...but service fees are taken from that.
          ).toString();

          const origFeeRecipientBalance = +(await testERC20.balanceOf(serviceFeeRecipient.address)).toString();
          const expectedFeeRecipientBalance = +(
            origFeeRecipientBalance
            + gainsFromFees
          ).toString();

          await marketProxy.marketSetBid(tokenId, defaultBid, bidder.address);

          const resultingOwnerBalance = (await testERC20.balanceOf(creatorAndOwner.address)).toString();
          const resultingFeeRecipientBalance = (await testERC20.balanceOf(serviceFeeRecipient.address)).toString();

          expect(+resultingOwnerBalance).to.eq(expectedOwnerBalance);
          expect(+resultingFeeRecipientBalance).to.eq(expectedFeeRecipientBalance);
        });
      });
    });
  });
});

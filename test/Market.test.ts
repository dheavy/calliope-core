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
  amount: BigNumberish;
};

type Bid = {
  amount: BigNumberish;
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
  let preparedMarket: Contract;
  let moneyMinter: SignerWithAddress;
  let serviceFeeReceiver: SignerWithAddress;
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
    serviceFeeReceiver = signers[3];

    testERC20 = await TestERC20Factory
      .connect(moneyMinter)
      .deploy(BigNumber.from('1000'));

    currency = testERC20.address;

    defaultFee = {
      percent: Decimal.new(2.5),
      recipient: serviceFeeReceiver.address
    };

    marketProxy = await TestMarketProxyFactory
      .connect(moneyMinter)
      .deploy(currency, defaultFee);

    productAddr = await marketProxy.address;

    bidder = signers[5];

    defaultBidShares = {
      owner: Decimal.new(90),
      creator: Decimal.new(10)
    };

    defaultAsk = {
      amount: 100,
      currency
    };

    defaultBid = {
      amount: 50,
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

  describe('#setAsk', () => {
    it('should revert if Ask amount shares do not add up properly when split into token shares percentages', async () => {
      // Percentages are taken here from defaultBidShares (70%, 20%, 10%).
      // Shares are calculated rounding down to the closest integer.
      // So with an amount of 88 => Math.floor(88 * 80 / 100) + (Math.floor(88 * 10 / 100) * 2) => 70 + 16 => 86 != 88
      await expect(marketProxy.marketSetAsk(tokenId, { ...defaultAsk, amount: 88 }))
        .to.eventually.be.rejectedWith('Market: invalid Ask for share-splitting');
    });

    it('should fulfill if Ask amount shares add up properly when split into token shares percentages', async () => {
      // Amount of 90 => Math.floor(90 * 80 / 100) + (Math.floor(90 * 10 / 100) * 2) => 72 + 18 => 90
      await expect(marketProxy.marketSetAsk(tokenId, { ...defaultAsk, amount: 90 }))
        .to.eventually.be.fulfilled;
    });

    it('should set the current ask for the token based on its ID', async () => {
      await setAsk();
      const currentAskForToken: Ask = await preparedMarket.currentAskForToken(tokenId);

      expect(currentAskForToken).to.exist;
      expect(parseInt(currentAskForToken.amount.toString()))
        .to.eq(parseInt(defaultAsk.amount.toString()));
      expect(currentAskForToken.currency).to.eq(defaultAsk.currency);
    });

    it('should emit an AskCreated event', async () => {
      await expect(marketProxy.marketSetAsk(tokenId, { ...defaultAsk }))
        .to.emit(preparedMarket, 'AskCreated')
        .withArgs(tokenId, [defaultAsk.amount, defaultAsk.currency]);
    });
  });

  describe('#removeAsk', () => {
    beforeEach(async () => {
      await setAsk();
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
    describe('fails', () => {
      it("should revert if bidder's address is the zero address", async () => {
        const bid: Bid = { ...defaultBid, bidder: ethers.constants.AddressZero };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: invalid bidder');
      });

      it('should revert is bid amount is zero', async () => {
        const bid: Bid = { ...defaultBid, amount: 0 };

        await expect(marketProxy.marketSetBid(tokenId, bid, signers[0].address))
          .to.be.eventually.rejectedWith('Market: invalid bid');
      });

      it('should revert if currency in bid is is the zero address', async () => {
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

    describe('succeeds', () => {
      beforeEach(async () => {
        // Bidder needs money to set bid.
        expect((await testERC20.balanceOf(bidder.address)).toString()).to.eq('0');
        await transferERC20(moneyMinter, bidder.address, 100);
        expect((await testERC20.balanceOf(bidder.address)).toString()).to.eq('100');

        // Approve contract and first signer (minter, creator...) to spend money on behalf of bidder to transfer when bid won.
        expect((await testERC20.allowance(bidder.address, preparedMarket.address)).toString()).to.eq('0');
        await approveERC20(bidder, preparedMarket.address, 100);
        expect((await testERC20.allowance(bidder.address, preparedMarket.address)).toString()).to.eq('100');
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

      describe('finalizing transfers', () => {
        let creatorAndOwner: SignerWithAddress;

        beforeEach(async () => {
          creatorAndOwner = signers[0];
          await mint();
          await setAsk({ ...defaultAsk, amount: defaultBid.amount });
          await marketProxy.marketSetBidShares(tokenId, defaultBidShares);
        });

        it('should transfer expected share of sale to owner (seller)', async () => {
          const decimalBase = 10**18;
          const sellerSharesPercent = +defaultBidShares.owner.value.toString() / decimalBase;
          const creatorSharesPercent = +defaultBidShares.creator.value.toString() / decimalBase;
          const gainsFromSellerShares = (+defaultBid.amount.toString() * sellerSharesPercent) / 100;
          const gainsFromCreatorShares = (+defaultBid.amount.toString() * creatorSharesPercent) / 100;

          const origOwnerBalance = +(await testERC20.balanceOf(creatorAndOwner.address)).toString();
          const expectedBalance = (
            origOwnerBalance
            + gainsFromSellerShares     // Test user is both (first) owner...
            + gainsFromCreatorShares    // ...and creator.
          ).toString();

          await marketProxy.marketSetBid(tokenId, defaultBid, bidder.address);
          expect((await testERC20.balanceOf(creatorAndOwner.address)).toString())
            .to.eq(expectedBalance);
        });
      });

      // it('should finalize NFT transfer automatically (move ERC-20 token amount from bidder to shareholders, move ERC-721 ownership from owner to bidder) if Bid matches Ask criterae (currency + equal or superior amount)', async () => {
        // await setAsk({ ...defaultAsk, amount: defaultBid.amount });
        // await mint();
        // console.log((await testERC20.balanceOf(bidder.address)).toString());
        // console.log((await testERC20.balanceOf(creatorAndOwner.address)).toString());

        // console.log('productAddr', productAddr);
        // console.log('marketProxy.address', marketProxy.address);
        // console.log('signers[0].address', signers[0].address);

        // Use proxy methods in TestMarketProxy to ensure caller is Product
        // to bypass "onlyProduct" modifier revocations
        // await marketProxy.marketSetBidShares(tokenId, defaultBidShares);
        // await marketProxy.marketSetBid(tokenId, defaultBid, bidder.address);
        // console.log((await testERC20.balanceOf(bidder.address)).toString());
        // console.log((await testERC20.balanceOf(creatorAndOwner.address)).toString());
      //});
    });
  });
});

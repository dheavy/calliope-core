/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MarketInterface extends ethers.utils.Interface {
  functions: {
    "acceptBid(uint256,tuple)": FunctionFragment;
    "areValidBidShares(tuple)": FunctionFragment;
    "bidSharesForToken(uint256)": FunctionFragment;
    "c_0xb32ebe3f(bytes32)": FunctionFragment;
    "currentAskForToken(uint256)": FunctionFragment;
    "fee()": FunctionFragment;
    "isValidBid(uint256,uint256)": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "product()": FunctionFragment;
    "removeAsk(uint256)": FunctionFragment;
    "removeBid(uint256,address)": FunctionFragment;
    "setAsk(uint256,tuple)": FunctionFragment;
    "setBid(uint256,tuple,address)": FunctionFragment;
    "setBidShares(uint256,tuple)": FunctionFragment;
    "splitShare(tuple,uint256)": FunctionFragment;
    "unpause()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptBid",
    values: [
      BigNumberish,
      { amount: BigNumberish; currency: string; bidder: string }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "areValidBidShares",
    values: [
      { creator: { value: BigNumberish }; owner: { value: BigNumberish } }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "bidSharesForToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "c_0xb32ebe3f",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "currentAskForToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isValidBid",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "product", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeAsk",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBid",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAsk",
    values: [BigNumberish, { amount: BigNumberish; currency: string }]
  ): string;
  encodeFunctionData(
    functionFragment: "setBid",
    values: [
      BigNumberish,
      { amount: BigNumberish; currency: string; bidder: string },
      string
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setBidShares",
    values: [
      BigNumberish,
      { creator: { value: BigNumberish }; owner: { value: BigNumberish } }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "splitShare",
    values: [{ value: BigNumberish }, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;

  decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "areValidBidShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bidSharesForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "c_0xb32ebe3f",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentAskForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isValidBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "product", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBidShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "splitShare", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;

  events: {
    "AskCreated(uint256,tuple)": EventFragment;
    "AskRemoved(uint256,tuple)": EventFragment;
    "BidCreated(uint256,tuple)": EventFragment;
    "BidFinalized(uint256,tuple)": EventFragment;
    "BidRemoved(uint256,tuple)": EventFragment;
    "BidShareUpdated(uint256,tuple)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AskCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AskRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidFinalized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidShareUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export class Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketInterface;

  functions: {
    acceptBid(
      tokenId_: BigNumberish,
      expectedBid_: { amount: BigNumberish; currency: string; bidder: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    areValidBidShares(
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    bidSharesForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          [BigNumber] & { value: BigNumber },
          [BigNumber] & { value: BigNumber }
        ] & {
          creator: [BigNumber] & { value: BigNumber };
          owner: [BigNumber] & { value: BigNumber };
        }
      ]
    >;

    c_0xb32ebe3f(
      c__0xb32ebe3f: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    currentAskForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, string] & { amount: BigNumber; currency: string }]>;

    fee(
      overrides?: CallOverrides
    ): Promise<
      [
        [[BigNumber] & { value: BigNumber }, string] & {
          percent: [BigNumber] & { value: BigNumber };
          recipient: string;
        }
      ]
    >;

    isValidBid(
      tokenId_: BigNumberish,
      bidAmount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    product(overrides?: CallOverrides): Promise<[string]>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeBid(
      tokenId_: BigNumberish,
      bidder_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBid(
      tokenId_: BigNumberish,
      bid_: { amount: BigNumberish; currency: string; bidder: string },
      from_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBidShares(
      tokenId_: BigNumberish,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    splitShare(
      sharePercent_: { value: BigNumberish },
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptBid(
    tokenId_: BigNumberish,
    expectedBid_: { amount: BigNumberish; currency: string; bidder: string },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  areValidBidShares(
    bidShares_: {
      creator: { value: BigNumberish };
      owner: { value: BigNumberish };
    },
    overrides?: CallOverrides
  ): Promise<boolean>;

  bidSharesForToken(
    tokenId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [[BigNumber] & { value: BigNumber }, [BigNumber] & { value: BigNumber }] & {
      creator: [BigNumber] & { value: BigNumber };
      owner: [BigNumber] & { value: BigNumber };
    }
  >;

  c_0xb32ebe3f(
    c__0xb32ebe3f: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  currentAskForToken(
    tokenId_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string] & { amount: BigNumber; currency: string }>;

  fee(
    overrides?: CallOverrides
  ): Promise<
    [[BigNumber] & { value: BigNumber }, string] & {
      percent: [BigNumber] & { value: BigNumber };
      recipient: string;
    }
  >;

  isValidBid(
    tokenId_: BigNumberish,
    bidAmount_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  product(overrides?: CallOverrides): Promise<string>;

  removeAsk(
    tokenId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeBid(
    tokenId_: BigNumberish,
    bidder_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAsk(
    tokenId_: BigNumberish,
    ask_: { amount: BigNumberish; currency: string },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBid(
    tokenId_: BigNumberish,
    bid_: { amount: BigNumberish; currency: string; bidder: string },
    from_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBidShares(
    tokenId_: BigNumberish,
    bidShares_: {
      creator: { value: BigNumberish };
      owner: { value: BigNumberish };
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  splitShare(
    sharePercent_: { value: BigNumberish },
    amount_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptBid(
      tokenId_: BigNumberish,
      expectedBid_: { amount: BigNumberish; currency: string; bidder: string },
      overrides?: CallOverrides
    ): Promise<void>;

    areValidBidShares(
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<boolean>;

    bidSharesForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber] & { value: BigNumber },
        [BigNumber] & { value: BigNumber }
      ] & {
        creator: [BigNumber] & { value: BigNumber };
        owner: [BigNumber] & { value: BigNumber };
      }
    >;

    c_0xb32ebe3f(
      c__0xb32ebe3f: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    currentAskForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { amount: BigNumber; currency: string }>;

    fee(
      overrides?: CallOverrides
    ): Promise<
      [[BigNumber] & { value: BigNumber }, string] & {
        percent: [BigNumber] & { value: BigNumber };
        recipient: string;
      }
    >;

    isValidBid(
      tokenId_: BigNumberish,
      bidAmount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    product(overrides?: CallOverrides): Promise<string>;

    removeAsk(tokenId_: BigNumberish, overrides?: CallOverrides): Promise<void>;

    removeBid(
      tokenId_: BigNumberish,
      bidder_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: CallOverrides
    ): Promise<void>;

    setBid(
      tokenId_: BigNumberish,
      bid_: { amount: BigNumberish; currency: string; bidder: string },
      from_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setBidShares(
      tokenId_: BigNumberish,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<void>;

    splitShare(
      sharePercent_: { value: BigNumberish },
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unpause(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    AskCreated(
      tokenId_?: BigNumberish | null,
      ask_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, string] & { amount: BigNumber; currency: string }
      ],
      {
        tokenId_: BigNumber;
        ask_: [BigNumber, string] & { amount: BigNumber; currency: string };
      }
    >;

    AskRemoved(
      tokenId_?: BigNumberish | null,
      ask_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, string] & { amount: BigNumber; currency: string }
      ],
      {
        tokenId_: BigNumber;
        ask_: [BigNumber, string] & { amount: BigNumber; currency: string };
      }
    >;

    BidCreated(
      tokenId_?: BigNumberish | null,
      bid_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        }
      ],
      {
        tokenId_: BigNumber;
        bid_: [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        };
      }
    >;

    BidFinalized(
      tokenId_?: BigNumberish | null,
      bid_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        }
      ],
      {
        tokenId_: BigNumber;
        bid_: [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        };
      }
    >;

    BidRemoved(
      tokenId_?: BigNumberish | null,
      bid_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        }
      ],
      {
        tokenId_: BigNumber;
        bid_: [BigNumber, string, string] & {
          amount: BigNumber;
          currency: string;
          bidder: string;
        };
      }
    >;

    BidShareUpdated(
      tokenId_?: BigNumberish | null,
      bidShares_?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [
          [BigNumber] & { value: BigNumber },
          [BigNumber] & { value: BigNumber }
        ] & {
          creator: [BigNumber] & { value: BigNumber };
          owner: [BigNumber] & { value: BigNumber };
        }
      ],
      {
        tokenId_: BigNumber;
        bidShares_: [
          [BigNumber] & { value: BigNumber },
          [BigNumber] & { value: BigNumber }
        ] & {
          creator: [BigNumber] & { value: BigNumber };
          owner: [BigNumber] & { value: BigNumber };
        };
      }
    >;

    Paused(account?: null): TypedEventFilter<[string], { account: string }>;

    Unpaused(account?: null): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    acceptBid(
      tokenId_: BigNumberish,
      expectedBid_: { amount: BigNumberish; currency: string; bidder: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    areValidBidShares(
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bidSharesForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    c_0xb32ebe3f(
      c__0xb32ebe3f: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentAskForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    isValidBid(
      tokenId_: BigNumberish,
      bidAmount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    product(overrides?: CallOverrides): Promise<BigNumber>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeBid(
      tokenId_: BigNumberish,
      bidder_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBid(
      tokenId_: BigNumberish,
      bid_: { amount: BigNumberish; currency: string; bidder: string },
      from_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBidShares(
      tokenId_: BigNumberish,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    splitShare(
      sharePercent_: { value: BigNumberish },
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptBid(
      tokenId_: BigNumberish,
      expectedBid_: { amount: BigNumberish; currency: string; bidder: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    areValidBidShares(
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bidSharesForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    c_0xb32ebe3f(
      c__0xb32ebe3f: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentAskForToken(
      tokenId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isValidBid(
      tokenId_: BigNumberish,
      bidAmount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    product(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeBid(
      tokenId_: BigNumberish,
      bidder_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBid(
      tokenId_: BigNumberish,
      bid_: { amount: BigNumberish; currency: string; bidder: string },
      from_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBidShares(
      tokenId_: BigNumberish,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    splitShare(
      sharePercent_: { value: BigNumberish },
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

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

interface IProductInterface extends ethers.utils.Interface {
  functions: {
    "acceptBid(uint256,tuple)": FunctionFragment;
    "creator()": FunctionFragment;
    "lend(uint256)": FunctionFragment;
    "mint(string,tuple)": FunctionFragment;
    "recover(uint256)": FunctionFragment;
    "removeAsk(uint256)": FunctionFragment;
    "removeBid(uint256)": FunctionFragment;
    "setAsk(uint256,tuple)": FunctionFragment;
    "setBid(uint256,tuple)": FunctionFragment;
    "transferAfterAuction(uint256,address)": FunctionFragment;
    "updateTokenURI(uint256,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptBid",
    values: [
      BigNumberish,
      {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "creator", values?: undefined): string;
  encodeFunctionData(functionFragment: "lend", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [
      string,
      { creator: { value: BigNumberish }; owner: { value: BigNumberish } }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "recover",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAsk",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBid",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setAsk",
    values: [BigNumberish, { amount: BigNumberish; currency: string }]
  ): string;
  encodeFunctionData(
    functionFragment: "setBid",
    values: [
      BigNumberish,
      {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAfterAuction",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenURI",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "creator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recover", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferAfterAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenURI",
    data: BytesLike
  ): Result;

  events: {
    "TokenMetadataURIUpdated(uint256,address,string)": EventFragment;
    "TokenURIUpdated(uint256,address,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TokenMetadataURIUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenURIUpdated"): EventFragment;
}

export class IProduct extends BaseContract {
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

  interface: IProductInterface;

  functions: {
    acceptBid(
      tokenId_: BigNumberish,
      bid_: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    creator(overrides?: CallOverrides): Promise<[string]>;

    lend(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mint(
      baseTokenURI_: string,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recover(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeBid(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBid(
      tokenId_: BigNumberish,
      bid: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferAfterAuction(
      tokenId_: BigNumberish,
      to_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTokenURI(
      tokenId_: BigNumberish,
      tokenURI_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptBid(
    tokenId_: BigNumberish,
    bid_: {
      amount: BigNumberish;
      currency: string;
      bidder: string;
      recipient: string;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  creator(overrides?: CallOverrides): Promise<string>;

  lend(
    tokenId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mint(
    baseTokenURI_: string,
    bidShares_: {
      creator: { value: BigNumberish };
      owner: { value: BigNumberish };
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recover(
    tokenId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeAsk(
    tokenId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeBid(
    tokenId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAsk(
    tokenId_: BigNumberish,
    ask_: { amount: BigNumberish; currency: string },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBid(
    tokenId_: BigNumberish,
    bid: {
      amount: BigNumberish;
      currency: string;
      bidder: string;
      recipient: string;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferAfterAuction(
    tokenId_: BigNumberish,
    to_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTokenURI(
    tokenId_: BigNumberish,
    tokenURI_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptBid(
      tokenId_: BigNumberish,
      bid_: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    creator(overrides?: CallOverrides): Promise<string>;

    lend(tokenId_: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mint(
      baseTokenURI_: string,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: CallOverrides
    ): Promise<void>;

    recover(tokenId_: BigNumberish, overrides?: CallOverrides): Promise<void>;

    removeAsk(tokenId_: BigNumberish, overrides?: CallOverrides): Promise<void>;

    removeBid(tokenId_: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: CallOverrides
    ): Promise<void>;

    setBid(
      tokenId_: BigNumberish,
      bid: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    transferAfterAuction(
      tokenId_: BigNumberish,
      to_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenURI(
      tokenId_: BigNumberish,
      tokenURI_: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    TokenMetadataURIUpdated(
      tokenId_?: BigNumberish | null,
      owner_?: null,
      uri_?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { tokenId_: BigNumber; owner_: string; uri_: string }
    >;

    TokenURIUpdated(
      tokenId_?: BigNumberish | null,
      owner_?: null,
      uri_?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { tokenId_: BigNumber; owner_: string; uri_: string }
    >;
  };

  estimateGas: {
    acceptBid(
      tokenId_: BigNumberish,
      bid_: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    creator(overrides?: CallOverrides): Promise<BigNumber>;

    lend(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mint(
      baseTokenURI_: string,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recover(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeBid(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBid(
      tokenId_: BigNumberish,
      bid: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferAfterAuction(
      tokenId_: BigNumberish,
      to_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTokenURI(
      tokenId_: BigNumberish,
      tokenURI_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptBid(
      tokenId_: BigNumberish,
      bid_: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    creator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lend(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      baseTokenURI_: string,
      bidShares_: {
        creator: { value: BigNumberish };
        owner: { value: BigNumberish };
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recover(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeAsk(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeBid(
      tokenId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAsk(
      tokenId_: BigNumberish,
      ask_: { amount: BigNumberish; currency: string },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBid(
      tokenId_: BigNumberish,
      bid: {
        amount: BigNumberish;
        currency: string;
        bidder: string;
        recipient: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferAfterAuction(
      tokenId_: BigNumberish,
      to_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenURI(
      tokenId_: BigNumberish,
      tokenURI_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

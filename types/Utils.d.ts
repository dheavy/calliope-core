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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface UtilsInterface extends ethers.utils.Interface {
  functions: {
    "areStringEquals(string,string)": FunctionFragment;
    "c_0xdcf489d7(bytes32)": FunctionFragment;
    "isEmptyString(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "areStringEquals",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "c_0xdcf489d7",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isEmptyString",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "areStringEquals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "c_0xdcf489d7",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isEmptyString",
    data: BytesLike
  ): Result;

  events: {};
}

export class Utils extends BaseContract {
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

  interface: UtilsInterface;

  functions: {
    areStringEquals(
      str1_: string,
      str2_: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    c_0xdcf489d7(
      c__0xdcf489d7: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    isEmptyString(str_: string, overrides?: CallOverrides): Promise<[boolean]>;
  };

  areStringEquals(
    str1_: string,
    str2_: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  c_0xdcf489d7(
    c__0xdcf489d7: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  isEmptyString(str_: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    areStringEquals(
      str1_: string,
      str2_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    c_0xdcf489d7(
      c__0xdcf489d7: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    isEmptyString(str_: string, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    areStringEquals(
      str1_: string,
      str2_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    c_0xdcf489d7(
      c__0xdcf489d7: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isEmptyString(str_: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    areStringEquals(
      str1_: string,
      str2_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    c_0xdcf489d7(
      c__0xdcf489d7: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isEmptyString(
      str_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

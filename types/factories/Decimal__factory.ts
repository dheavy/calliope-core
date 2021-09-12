/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Decimal, DecimalInterface } from "../Decimal";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "c__0x2ca4d5d7",
        type: "bytes32",
      },
    ],
    name: "c_0x2ca4d5d7",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60e0610052600b82828239805160001a607314610045577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c8063217d4167146038575b600080fd5b604e6004803603810190604a91906066565b6050565b005b50565b6000813590506060816096565b92915050565b600060208284031215607757600080fd5b60006083848285016053565b91505092915050565b6000819050919050565b609d81608c565b811460a757600080fd5b5056fea2646970667358221220efa7d23b2727d316607259e6165db2ad05dd7db873eb5e12dbe7e80549892d4b64736f6c63430008040033";

export class Decimal__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Decimal> {
    return super.deploy(overrides || {}) as Promise<Decimal>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Decimal {
    return super.attach(address) as Decimal;
  }
  connect(signer: Signer): Decimal__factory {
    return super.connect(signer) as Decimal__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DecimalInterface {
    return new utils.Interface(_abi) as DecimalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Decimal {
    return new Contract(address, _abi, signerOrProvider) as Decimal;
  }
}

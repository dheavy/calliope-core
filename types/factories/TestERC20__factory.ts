/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestERC20, TestERC20Interface } from "../TestERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000b8138038062000b8183398101604081905262000034916200024a565b6040518060400160405280600981526020016805465737445524332360bc1b815250604051806040016040528060038152602001621514d560ea1b81525081600390805190602001906200008a929190620001a4565b508051620000a0906004906020840190620001a4565b505050620000b53382620000bc60201b60201c565b50620002c5565b6001600160a01b038216620001175760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012b919062000263565b90915550506001600160a01b038216600090815260208190526040812080548392906200015a90849062000263565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001b29062000288565b90600052602060002090601f016020900481019282620001d6576000855562000221565b82601f10620001f157805160ff191683800117855562000221565b8280016001018555821562000221579182015b828111156200022157825182559160200191906001019062000204565b506200022f92915062000233565b5090565b5b808211156200022f576000815560010162000234565b6000602082840312156200025c578081fd5b5051919050565b600082198211156200028357634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200029d57607f821691505b60208210811415620002bf57634e487b7160e01b600052602260045260246000fd5b50919050565b6108ac80620002d56000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100df57806323b872dd146100f1578063313ce56714610104578063395093511461011357806370a082311461012657806395d89b411461014f578063a457c2d714610157578063a9059cbb1461016a578063dd62ed3e1461017d575b600080fd5b6100a66101b6565b6040516100b391906107c4565b60405180910390f35b6100cf6100ca36600461079b565b610248565b60405190151581526020016100b3565b6002545b6040519081526020016100b3565b6100cf6100ff366004610760565b61025e565b604051601281526020016100b3565b6100cf61012136600461079b565b61030d565b6100e361013436600461070d565b6001600160a01b031660009081526020819052604090205490565b6100a6610349565b6100cf61016536600461079b565b610358565b6100cf61017836600461079b565b6103f1565b6100e361018b36600461072e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101c59061083b565b80601f01602080910402602001604051908101604052809291908181526020018280546101f19061083b565b801561023e5780601f106102135761010080835404028352916020019161023e565b820191906000526020600020905b81548152906001019060200180831161022157829003601f168201915b5050505050905090565b60006102553384846103fe565b50600192915050565b600061026b848484610522565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156102f55760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61030285338584036103fe565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610255918590610344908690610817565b6103fe565b6060600480546101c59061083b565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156103da5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016102ec565b6103e733858584036103fe565b5060019392505050565b6000610255338484610522565b6001600160a01b0383166104605760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102ec565b6001600160a01b0382166104c15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102ec565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105865760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102ec565b6001600160a01b0382166105e85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102ec565b6001600160a01b038316600090815260208190526040902054818110156106605760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102ec565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610697908490610817565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106e391815260200190565b60405180910390a350505050565b80356001600160a01b038116811461070857600080fd5b919050565b60006020828403121561071e578081fd5b610727826106f1565b9392505050565b60008060408385031215610740578081fd5b610749836106f1565b9150610757602084016106f1565b90509250929050565b600080600060608486031215610774578081fd5b61077d846106f1565b925061078b602085016106f1565b9150604084013590509250925092565b600080604083850312156107ad578182fd5b6107b6836106f1565b946020939093013593505050565b6000602080835283518082850152825b818110156107f0578581018301518582016040015282016107d4565b818111156108015783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561083657634e487b7160e01b81526011600452602481fd5b500190565b600181811c9082168061084f57607f821691505b6020821081141561087057634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220233d612f34cf9a2aca40a75cbad91c8133e6eb8e13513168f720ad59c43f5e5964736f6c63430008040033";

export class TestERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestERC20> {
    return super.deploy(initialSupply, overrides || {}) as Promise<TestERC20>;
  }
  getDeployTransaction(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {});
  }
  attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}

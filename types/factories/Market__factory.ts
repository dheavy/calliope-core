/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Market, MarketInterface } from "../Market";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "product_",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency_",
        type: "address",
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
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.Ask",
        name: "ask_",
        type: "tuple",
      },
    ],
    name: "AskCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.Ask",
        name: "ask_",
        type: "tuple",
      },
    ],
    name: "AskRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.Bid",
        name: "bid_",
        type: "tuple",
      },
    ],
    name: "BidCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.Bid",
        name: "bid_",
        type: "tuple",
      },
    ],
    name: "BidFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.Bid",
        name: "bid_",
        type: "tuple",
      },
    ],
    name: "BidRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "previousOwner",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "creator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "owner",
            type: "tuple",
          },
        ],
        indexed: false,
        internalType: "struct IMarket.BidShares",
        name: "bidShares_",
        type: "tuple",
      },
    ],
    name: "BidShareUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.Bid",
        name: "expectedBid_",
        type: "tuple",
      },
    ],
    name: "acceptBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "previousOwner",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "creator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "owner",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.BidShares",
        name: "bidShares_",
        type: "tuple",
      },
    ],
    name: "areValidBidShares",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "bidSharesForToken",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "previousOwner",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "creator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "owner",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.BidShares",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "currentAskForToken",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        internalType: "struct IMarket.Ask",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bidder_",
        type: "address",
      },
    ],
    name: "getBidFromBidder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.Bid",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidAmount_",
        type: "uint256",
      },
    ],
    name: "isValidBid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "product",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "removeAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bidder_",
        type: "address",
      },
    ],
    name: "removeBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        internalType: "struct IMarket.Ask",
        name: "ask_",
        type: "tuple",
      },
    ],
    name: "setAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "sellOnShare",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.Bid",
        name: "bid_",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
    ],
    name: "setBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "previousOwner",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "creator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct Decimal.D256",
            name: "owner",
            type: "tuple",
          },
        ],
        internalType: "struct IMarket.BidShares",
        name: "bidShares_",
        type: "tuple",
      },
    ],
    name: "setBidShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct Decimal.D256",
        name: "sharePercent_",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "splitShare",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001faa38038062001faa83398101604081905262000034916200008c565b600080546001600160a81b0319166101006001600160a01b0394851602179055600280546001600160a01b03191691909216179055620000c3565b80516001600160a01b03811681146200008757600080fd5b919050565b600080604083850312156200009f578182fd5b620000aa836200006f565b9150620000ba602084016200006f565b90509250929050565b611ed780620000d36000396000f3fe608060405234801561001057600080fd5b50600436106100d05760003560e01c806302e8fe13146100d557806328220f35146100fd5780633f4ba83a14610112578063578064f61461011a5780635c975abb1461019357806362f24b701461019e578063776a0835146101b157806379cef8bd146101c45780638456cb59146101e4578063b920c123146101ec578063ba3393991461020d578063bdb5869814610220578063bf9ce95214610233578063eb55683a14610258578063f9ce05821461026b578063fc56692c1461028b575b600080fd5b6100e86100e3366004611ace565b61029e565b60405190151581526020015b60405180910390f35b61011061010b3660046119aa565b61032d565b005b6101106103e3565b61016f6101283660046119aa565b604080518082019091526000808252602082015250600090815260046020908152604091829020825180840190935280548352600101546001600160a01b03169082015290565b60408051825181526020928301516001600160a01b031692810192909252016100f4565b60005460ff166100e8565b6101106101ac366004611a09565b61041c565b6101106101bf3660046119da565b61050b565b6101d76101d23660046119da565b6106ff565b6040516100f49190611c7c565b610110610775565b6101ff6101fa366004611980565b6107ac565b6040519081526020016100f4565b61011061021b366004611a6b565b6107cb565b61011061022e366004611a8e565b6109dd565b60005461024b9061010090046001600160a01b031681565b6040516100f49190611aef565b610110610266366004611a3f565b61102d565b61027e6102793660046119aa565b6110cb565b6040516100f49190611bf5565b6100e861029936600461194a565b611121565b6000806102aa846110cb565b90506102b581611121565b6102da5760405162461bcd60e51b81526004016102d190611b49565b60405180910390fd5b821580159061032357506102f28160400151846107ac565b81516102fe90856107ac565b61030c8360200151866107ac565b6103169190611cc5565b6103209190611cc5565b83145b9150505b92915050565b60005461010090046001600160a01b0316331461035c5760405162461bcd60e51b81526004016102d190611b94565b807fbf58f6d6c7d7c6efc69e7444efa93ed26d7cdc0e82e12a37df96f36a367561df600460008481526020019081526020016000206040516103b79190815481526001909101546001600160a01b0316602082015260400190565b60405180910390a2600090815260046020526040812090815560010180546001600160a01b0319169055565b60005461010090046001600160a01b031633146104125760405162461bcd60e51b81526004016102d190611b94565b61041a611164565b565b60005461010090046001600160a01b0316331461044b5760405162461bcd60e51b81526004016102d190611b94565b61045682823561029e565b6104b25760405162461bcd60e51b815260206004820152602760248201527f4d61726b65743a20696e76616c69642041736b20666f722073686172652d73706044820152666c697474696e6760c81b60648201526084016102d1565b600082815260046020526040902081906104cc8282611e34565b905050817ff7347cb9e91d8cbe995b51920ba5f92cbf84a9e09cbed3cd7a739fef4d1d07cf826040516104ff9190611bc7565b60405180910390a25050565b60005461010090046001600160a01b0316331461053a5760405162461bcd60e51b81526004016102d190611b94565b60008281526001602081815260408084206001600160a01b0380871686529252909220805491810154909216816105af5760405162461bcd60e51b815260206004820152601960248201527813585c9ad95d0e8818d85b9b9bdd081c995b5bdd9948189a59603a1b60448201526064016102d1565b6000819050857fcbebd567b8a5c57f63ec61dc46746aab28daff6bdd1f4a6a0a305c17fa5465c98560405161062091908154815260018201546001600160a01b0390811660208301526002830154811660408301526003830154166060820152600490910154608082015260a00190565b60405180910390a260008681526001602081815260408084206001600160a01b03808b168652925280842084815592830180546001600160a01b0319908116909155600284018054821690556003840180549091169055600492830193909355915163a9059cbb60e01b81529183169163a9059cbb916106a4918991889101611b03565b602060405180830381600087803b1580156106be57600080fd5b505af11580156106d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f6919061192a565b50505050505050565b610707611788565b5060009182526001602081815260408085206001600160a01b039485168652825293849020845160a081018652815481529281015484168383015260028101548416838601526003810154909316606083015283519081019093526004909101548252608081019190915290565b60005461010090046001600160a01b031633146107a45760405162461bcd60e51b81526004016102d190611b94565b61041a6111f1565b600060646107ba838561126c565b6107c49190611cdd565b9392505050565b60005461010090046001600160a01b031633146107fa5760405162461bcd60e51b81526004016102d190611b94565b60008281526001602052604080822090829061081c90606086019086016118f2565b6001600160a01b0390811682526020808301939093526040918201600020825160a08101845281548152600182015483168186015260028201548316818501526003820154909216606083015282519384019092526004909101548252608081019190915280519091506108a25760405162461bcd60e51b81526004016102d190611b1c565b805182351480156108d757506108be60408301602084016118f2565b6001600160a01b031681602001516001600160a01b0316145b80156108eb57506080818101515190830135145b801561091b575061090260808301606084016118f2565b6001600160a01b031681606001516001600160a01b0316145b6109605760405162461bcd60e51b815260206004820152601660248201527513585c9ad95d0e881d5b995e1c1958dd195908189a5960521b60448201526064016102d1565b61096e83826000015161029e565b6109ca5760405162461bcd60e51b815260206004820152602760248201527f4d61726b65743a20696e76616c69642042696420666f722073686172652d73706044820152666c697474696e6760c81b60648201526084016102d1565b6109d8838260400151611288565b505050565b60005461010090046001600160a01b03163314610a0c5760405162461bcd60e51b81526004016102d190611b94565b6000838152600360209081526040918290208251608081018452815460608201908152815283518084018552600183015481528184015283519283018452600290910154825291820152610a626012600a611d40565b610a6d906064611de8565b602082015151610a8290608086013590611cc5565b1115610ae85760405162461bcd60e51b815260206004820152602f60248201527f4d61726b65743a20696e76616c69642073656c6c2d6f6e2066656520666f722060448201526e73686172652d73706c697474696e6760881b60648201526084016102d1565b6000610afa60608501604086016118f2565b6001600160a01b03161415610b4a5760405162461bcd60e51b815260206004820152601660248201527526b0b935b2ba1d1034b73b30b634b2103134b23232b960511b60448201526064016102d1565b8235610b685760405162461bcd60e51b81526004016102d190611b1c565b6000610b7a60408501602086016118f2565b6001600160a01b03161415610bcc5760405162461bcd60e51b81526020600482015260186024820152774d61726b65743a20696e76616c69642063757272656e637960401b60448201526064016102d1565b6002546001600160a01b0316610be860408501602086016118f2565b6001600160a01b031614610c3e5760405162461bcd60e51b815260206004820152601d60248201527f4d61726b65743a2063757272656e6379206e6f7420616363657074656400000060448201526064016102d1565b6000610c5060808501606086016118f2565b6001600160a01b03161415610ca75760405162461bcd60e51b815260206004820152601d60248201527f4d61726b65743a20696e76616c69642062696420726563697069656e7400000060448201526064016102d1565b600084815260016020526040808220908290610cc990606088019088016118f2565b6001600160a01b031681526020810191909152604001600020805490915015610d0057610d00856101bf60608701604088016118f2565b6000610d1260408601602087016118f2565b90506000816001600160a01b03166370a08231306040518263ffffffff1660e01b8152600401610d429190611aef565b60206040518083038186803b158015610d5a57600080fd5b505afa158015610d6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9291906119c2565b6040516323b872dd60e01b81526001600160a01b03878116600483015230602483015288356044830152919250908316906323b872dd90606401602060405180830381600087803b158015610de657600080fd5b505af1158015610dfa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1e919061192a565b506040516370a0823160e01b81526000906001600160a01b038416906370a0823190610e4e903090600401611aef565b60206040518083038186803b158015610e6657600080fd5b505afa158015610e7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9e91906119c2565b90506040518060a001604052808383610eb79190611e07565b8152602001886020016020810190610ecf91906118f2565b6001600160a01b03168152602001610eed60608a0160408b016118f2565b6001600160a01b03168152602001610f0b60808a0160608b016118f2565b6001600160a01b03168152602001610f2b368a90038a0160808b01611965565b90526000898152600160205260408082209190610f4e9060608c01908c016118f2565b6001600160a01b039081168252602080830193909352604091820160002084518155928401516001840180549183166001600160a01b0319928316179055848301516002850180549184169183169190911790556060850151600385018054919093169116179055608090920151516004909101555188907f327bc9021bfbee403a11b13dd6c819999006aff090cc129f07e9f2840af38dd590610ff3908a90611c19565b60405180910390a261100588886116d5565b15611023576110238861101e60608a0160408b016118f2565b611288565b5050505050505050565b60005461010090046001600160a01b0316331461105c5760405162461bcd60e51b81526004016102d190611b94565b61106581611121565b6110815760405162461bcd60e51b81526004016102d190611b49565b6000828152600360209081526040918290208351518155908301515160018201558183015151600290910155518290600080516020611e82833981519152906104ff908490611bf5565b6110d36117d7565b50600090815260036020908152604091829020825160808101845281546060820190815281528351808401855260018301548152818401528351928301845260029091015482529182015290565b600061112f6012600a611d40565b61113a906064611de8565b8251516040840151516020850151516111539190611cc5565b61115d9190611cc5565b1492915050565b60005460ff166111ad5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016102d1565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516111e79190611aef565b60405180910390a1565b60005460ff16156112375760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016102d1565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586111da3390565b80516000906107c49084906112836012600a611d40565b611752565b60008281526001602081815260408084206001600160a01b038681168652908352818520825160a0810184528154815294810154821685850190815260028201548316868501526003808301548416606088015284518087018652600493840154815260808801528988529094528286209351955492516331a9108f60e11b8152908101889052939492938382169263a9059cbb926101009091041690636352211e9060240160206040518083038186803b15801561134657600080fd5b505afa15801561135a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061137e919061190e565b604080516020810190915260028601548152865161139c91906107ac565b6040518363ffffffff1660e01b81526004016113b9929190611b03565b602060405180830381600087803b1580156113d357600080fd5b505af11580156113e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061140b919061192a565b50806001600160a01b031663a9059cbb600060019054906101000a90046001600160a01b03166001600160a01b03166302d05d3f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561146957600080fd5b505afa15801561147d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a1919061190e565b60408051602081019091526001860154815286516114bf91906107ac565b6040518363ffffffff1660e01b81526004016114dc929190611b03565b602060405180830381600087803b1580156114f657600080fd5b505af115801561150a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061152e919061192a565b5060005460608401516040516377a41d3f60e11b8152600481018890526001600160a01b039182166024820152610100909204169063ef483a7e90604401600060405180830381600087803b15801561158657600080fd5b505af115801561159a573d6000803e3d6000fd5b5050604080516020808201835260808801515160008b81526003909252929020600101549093508392506115d06012600a611d40565b6115db906064611de8565b6115e59190611e07565b6115ef9190611e07565b905251600280840191909155608084015151835560008681526001602081815260408084206001600160a01b038a16855290915280832083815591820180546001600160a01b031990811690915593820180548516905560038201805490941690935560040155518590600080516020611e828339815191529061168e9085908154815260018201546020820152600290910154604082015260600190565b60405180910390a2847fb6ef177c7a6f32b283a49b5e0463a39240cdaa278028dfb219480d050e8ee54c846040516116c69190611c7c565b60405180910390a25050505050565b6000828152600460205260408120600101546001600160a01b0316158015906117335750600083815260046020908152604091829020600101546001600160a01b031691611728919085019085016118f2565b6001600160a01b0316145b80156107c4575050600091825260046020526040909120549035101590565b6000611768826117628686611770565b9061177c565b949350505050565b60006107c48284611de8565b60006107c48284611cdd565b6040518060a001604052806000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b031681526020016117d2611800565b905290565b60405180606001604052806117ea611800565b81526020016117f7611800565b81526020016117d25b6040518060200160405280600081525090565b600060608284031215611824578081fd5b604051606081016001600160401b038111828210171561185257634e487b7160e01b83526041600452602483fd5b60405290508061186284846118a6565b815261187184602085016118a6565b602082015261188384604085016118a6565b60408201525092915050565b600060a082840312156118a0578081fd5b50919050565b6000602082840312156118b7578081fd5b604051602081016001600160401b03811182821017156118e557634e487b7160e01b83526041600452602483fd5b6040529135825250919050565b600060208284031215611903578081fd5b81356107c481611e69565b60006020828403121561191f578081fd5b81516107c481611e69565b60006020828403121561193b578081fd5b815180151581146107c4578182fd5b60006060828403121561195b578081fd5b6107c48383611813565b600060208284031215611976578081fd5b6107c483836118a6565b60008060408385031215611992578081fd5b61199c84846118a6565b946020939093013593505050565b6000602082840312156119bb578081fd5b5035919050565b6000602082840312156119d3578081fd5b5051919050565b600080604083850312156119ec578182fd5b8235915060208301356119fe81611e69565b809150509250929050565b6000808284036060811215611a1c578283fd5b833592506040601f1982011215611a31578182fd5b506020830190509250929050565b60008060808385031215611a51578182fd5b82359150611a628460208501611813565b90509250929050565b60008060c08385031215611a7d578182fd5b82359150611a62846020850161188f565b600080600060e08486031215611aa2578081fd5b83359250611ab3856020860161188f565b915060c0840135611ac381611e69565b809150509250925092565b60008060408385031215611ae0578182fd5b50508035926020909101359150565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b60208082526013908201527213585c9ad95d0e881a5b9d985b1a5908189a59606a1b604082015260600190565b6020808252602b908201527f4d61726b65743a20696e76616c696420626964207368617265732c206d75737460408201526a02073756d20746f203130360ac1b606082015260800190565b6020808252601990820152784d61726b65743a2050726f647563742063616c6c206f6e6c7960381b604082015260600190565b81358152604081016020830135611bdd81611e69565b6001600160a01b031660209290920191909152919050565b81515181526020808301515190820152604091820151519181019190915260600190565b8135815260a081016020830135611c2f81611e69565b6001600160a01b039081166020840152604084013590611c4e82611e69565b9081166040840152606084013590611c6582611e69565b166060830152608092830135929091019190915290565b815181526020808301516001600160a01b039081169183019190915260408084015182169083015260608084015190911690820152608091820151519181019190915260a00190565b60008219821115611cd857611cd8611e1e565b500190565b600082611cf857634e487b7160e01b81526012600452602481fd5b500490565b600181815b80851115611d38578160001904821115611d1e57611d1e611e1e565b80851615611d2b57918102915b93841c9390800290611d02565b509250929050565b60006107c48383600082611d5657506001610327565b81611d6357506000610327565b8160018114611d795760028114611d8357611d9f565b6001915050610327565b60ff841115611d9457611d94611e1e565b50506001821b610327565b5060208310610133831016604e8410600b8410161715611dc2575081810a610327565b611dcc8383611cfd565b8060001904821115611de057611de0611e1e565b029392505050565b6000816000190483118215151615611e0257611e02611e1e565b500290565b600082821015611e1957611e19611e1e565b500390565b634e487b7160e01b600052601160045260246000fd5b81358155600181016020830135611e4a81611e69565b81546001600160a01b0319166001600160a01b03919091161790555050565b6001600160a01b0381168114611e7e57600080fd5b5056fedb88d4e96cb8697aaee5e575ee5f460817709a1dfcfbf7ba15192e90b5c86f9fa2646970667358221220367b825e8181a1c814a3b33a514003c1623cd5a1c70a78ec65d3d99fdf45a30364736f6c63430008040033";

export class Market__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    product_: string,
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Market> {
    return super.deploy(
      product_,
      currency_,
      overrides || {}
    ) as Promise<Market>;
  }
  getDeployTransaction(
    product_: string,
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(product_, currency_, overrides || {});
  }
  attach(address: string): Market {
    return super.attach(address) as Market;
  }
  connect(signer: Signer): Market__factory {
    return super.connect(signer) as Market__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketInterface {
    return new utils.Interface(_abi) as MarketInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Market {
    return new Contract(address, _abi, signerOrProvider) as Market;
  }
}

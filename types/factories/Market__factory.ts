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
            name: "percent",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IMarket.Fee",
        name: "fee_",
        type: "tuple",
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
    inputs: [],
    name: "fee",
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
            name: "percent",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct IMarket.Fee",
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
  "0x60806040523480156200001157600080fd5b5060405162001e3038038062001e30833981016040819052620000349162000127565b6000805460ff1916905580515115620000b45760208101516001600160a01b0316620000b45760405162461bcd60e51b815260206004820152602560248201527f4d61726b65743a20696e76616c69642066656520726563697069656e74206164604482015264647265737360d81b606482015260840160405180910390fd5b600080546001600160a01b0394851661010002610100600160a81b0319909116179055600280549284166001600160a01b0319938416179055805151600555602001516006805491909316911617905562000218565b80516001600160a01b03811681146200012257600080fd5b919050565b600080600083850360808112156200013d578384fd5b62000148856200010a565b935062000158602086016200010a565b9250603f190160408112156200016c578182fd5b604080519081016001600160401b03811182821017156200019b57634e487b7160e01b84526041600452602484fd5b6040526020821215620001ac578283fd5b620001b6620001e1565b915060408601518252818152620001d0606087016200010a565b602082015280925050509250925092565b604051602081016001600160401b03811182821017156200021257634e487b7160e01b600052604160045260246000fd5b60405290565b611c0880620002286000396000f3fe608060405234801561001057600080fd5b50600436106100db5760003560e01c806302e8fe13146100e057806328220f35146101085780633b0352e41461011d5780633f4ba83a14610130578063578064f6146101385780635c975abb146101b157806362f24b70146101bc578063776a0835146101cf57806379cef8bd146101e25780638456cb59146102b357806385100850146102bb578063b920c123146102ce578063bd01ef4d146102ef578063bf9ce95214610302578063ddca3f4314610327578063f9ce058214610354578063f9d222bf14610374575b600080fd5b6100f36100ee3660046118c5565b610387565b60405190151581526020015b60405180910390f35b61011b6101163660046117a1565b6103b4565b005b61011b61012b366004611836565b61047c565b61011b61057b565b61018d6101463660046117a1565b604080518082019091526000808252602082015250600090815260046020908152604091829020825180840190935280548352600101546001600160a01b03169082015290565b60408051825181526020928301516001600160a01b031692810192909252016100ff565b60005460ff166100f3565b61011b6101ca366004611800565b6105bd565b61011b6101dd3660046117d1565b61068f565b61026f6101f03660046117d1565b6040805160808101825260008082526020820181905291810182905260608101919091525060009182526001602081815260408085206001600160a01b03948516865282529384902084516080810186528154815292810154841691830191909152600281015483169382019390935260039092015416606082015290565b6040516100ff9190815181526020808301516001600160a01b0390811691830191909152604080840151821690830152606092830151169181019190915260800190565b61011b610870565b61011b6102c9366004611862565b6108b0565b6102e16102dc366004611777565b610aa0565b6040519081526020016100ff565b6100f36102fd36600461175c565b610abf565b60005461031a9061010090046001600160a01b031681565b6040516100ff91906118e6565b61032f610af2565b6040805182515181526020928301516001600160a01b031692810192909252016100ff565b6103676103623660046117a1565b610b25565b6040516100ff91906119a1565b61011b610382366004611885565b610b6c565b60008061039384610b25565b905061039e81610abf565b80156103aa5750600083115b9150505b92915050565b60005461010090046001600160a01b0316336001600160a01b0316146103f55760405162461bcd60e51b81526004016103ec90611940565b60405180910390fd5b807fbf58f6d6c7d7c6efc69e7444efa93ed26d7cdc0e82e12a37df96f36a367561df600460008481526020019081526020016000206040516104509190815481526001909101546001600160a01b0316602082015260400190565b60405180910390a2600090815260046020526040812090815560010180546001600160a01b0319169055565b60005461010090046001600160a01b0316336001600160a01b0316146104b45760405162461bcd60e51b81526004016103ec90611940565b6104bd81610abf565b61051d5760405162461bcd60e51b815260206004820152602b60248201527f4d61726b65743a20696e76616c696420626964207368617265732c206d75737460448201526a02073756d20746f203130360ac1b60648201526084016103ec565b600082815260036020908152604091829020835151815590830151516001909101555182907f30752634c4278c3dd1a93f0638f727c03210e52d9f7acf5a93d7a463a437b96f9061056f9084906119a1565b60405180910390a25050565b60005461010090046001600160a01b0316336001600160a01b0316146105b35760405162461bcd60e51b81526004016103ec90611940565b6105bb6110c2565b565b60005461010090046001600160a01b0316336001600160a01b0316146105f55760405162461bcd60e51b81526004016103ec90611940565b610600828235610387565b6106425760405162461bcd60e51b81526020600482015260136024820152724d61726b65743a20696e76616c69642041736b60681b60448201526064016103ec565b6000828152600460205260409020819061065c8282611b85565b905050817ff7347cb9e91d8cbe995b51920ba5f92cbf84a9e09cbed3cd7a739fef4d1d07cf8260405161056f9190611973565b60005461010090046001600160a01b0316336001600160a01b0316146106c75760405162461bcd60e51b81526004016103ec90611940565b60008281526001602081815260408084206001600160a01b03808716865292529092208054918101549092168161073c5760405162461bcd60e51b815260206004820152601960248201527813585c9ad95d0e8818d85b9b9bdd081c995b5bdd9948189a59603a1b60448201526064016103ec565b604080518454815260018501546001600160a01b039081166020830152600286015481168284015260038601541660608201529051829187917fa4fba658c185c033488d787705db1bdd0f9086411cff4c65c3a4a296b90a32279181900360800190a260008681526001602081815260408084206001600160a01b03808b168652925280842093845591830180546001600160a01b031990811690915560028401805482169055600390930180549093169092555163a9059cbb60e01b81529082169063a9059cbb9061081590889087906004016118fa565b602060405180830381600087803b15801561082f57600080fd5b505af1158015610843573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610867919061173c565b50505050505050565b60005461010090046001600160a01b0316336001600160a01b0316146108a85760405162461bcd60e51b81526004016103ec90611940565b6105bb61114f565b60005461010090046001600160a01b0316336001600160a01b0316146108e85760405162461bcd60e51b81526004016103ec90611940565b60008281526001602052604080822090829061090a9060608601908601611704565b6001600160a01b039081168252602080830193909352604091820160002082516080810184528154808252600183015484169582019590955260028201548316938101939093526003015416606082015291506109795760405162461bcd60e51b81526004016103ec90611913565b805182351480156109ae57506109956040830160208401611704565b6001600160a01b031681602001516001600160a01b0316145b80156109de57506109c56080830160608401611704565b6001600160a01b031681606001516001600160a01b0316145b610a235760405162461bcd60e51b815260206004820152601660248201527513585c9ad95d0e881d5b995e1c1958dd195908189a5960521b60448201526064016103ec565b610a31838260000151610387565b610a8d5760405162461bcd60e51b815260206004820152602760248201527f4d61726b65743a20696e76616c69642042696420666f722073686172652d73706044820152666c697474696e6760c81b60648201526084016103ec565b610a9b8382604001516111ca565b505050565b60006064610aae8385611510565b610ab89190611a2e565b9392505050565b6000610acd6012600a611a91565b610ad8906064611b39565b602083015151835151610aeb9190611a16565b1492915050565b610afa6115df565b50604080516060810182526005549181019182529081526006546001600160a01b0316602082015290565b610b2d6115ff565b50600090815260036020908152604091829020825160608101845281548185019081528152835180840190945260019091015483529081019190915290565b60005461010090046001600160a01b0316336001600160a01b031614610ba45760405162461bcd60e51b81526004016103ec90611940565b6000610bb66060840160408501611704565b6001600160a01b03161415610c065760405162461bcd60e51b815260206004820152601660248201527526b0b935b2ba1d1034b73b30b634b2103134b23232b960511b60448201526064016103ec565b8135610c245760405162461bcd60e51b81526004016103ec90611913565b6000610c366040840160208501611704565b6001600160a01b03161415610c885760405162461bcd60e51b81526020600482015260186024820152774d61726b65743a20696e76616c69642063757272656e637960401b60448201526064016103ec565b6002546001600160a01b0316610ca46040840160208501611704565b6001600160a01b031614610cfa5760405162461bcd60e51b815260206004820152601d60248201527f4d61726b65743a2063757272656e6379206e6f7420616363657074656400000060448201526064016103ec565b6000610d0c6080840160608501611704565b6001600160a01b03161415610d635760405162461bcd60e51b815260206004820152601d60248201527f4d61726b65743a20696e76616c69642062696420726563697069656e7400000060448201526064016103ec565b600083815260016020526040808220908290610d859060608701908701611704565b6001600160a01b031681526020810191909152604001600020805490915015610dbc57610dbc846101dd6060860160408701611704565b6000610dce6040850160208601611704565b90506000816001600160a01b03166370a08231306040518263ffffffff1660e01b8152600401610dfe91906118e6565b60206040518083038186803b158015610e1657600080fd5b505afa158015610e2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4e91906117b9565b6040516323b872dd60e01b81526001600160a01b03868116600483015230602483015287356044830152919250908316906323b872dd90606401602060405180830381600087803b158015610ea257600080fd5b505af1158015610eb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eda919061173c565b506040516370a0823160e01b81526000906001600160a01b038416906370a0823190610f0a9030906004016118e6565b60206040518083038186803b158015610f2257600080fd5b505afa158015610f36573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5a91906117b9565b905060405180608001604052808383610f739190611b58565b8152602001876020016020810190610f8b9190611704565b6001600160a01b03168152602001610fa96060890160408a01611704565b6001600160a01b03168152602001610fc76080890160608a01611704565b6001600160a01b031690526000888152600160205260408082209190610ff39060608b01908b01611704565b6001600160a01b039081168252602080830193909352604091820160002084518155928401516001840180546001600160a01b0319908116928416929092179055848301516002850180548316918416919091179055606090940151600390930180549094169216919091179091555187907f052a2ac8735c2598d4b9577adfefb5ea183768839cbd625b7162cadc6656cf01906110929089906119ba565b60405180910390a26110a4878761152c565b1561086757610867876110bd6060890160408a01611704565b6111ca565b60005460ff1661110b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016103ec565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405161114591906118e6565b60405180910390a1565b60005460ff16156111955760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016103ec565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586111383390565b60008281526001602081815260408084206001600160a01b0380871686529083528185208251608081018452815481529481015482168585019081526002820154831686850152600391820154831660608701528887529084528286209051955483516302d05d3f60e01b815293519596919591948584169463a9059cbb94610100909304909216926302d05d3f926004808201939291829003018186803b15801561127557600080fd5b505afa158015611289573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ad9190611720565b60408051602081019091528554815286516112c89190610aa0565b6040518363ffffffff1660e01b81526004016112e59291906118fa565b602060405180830381600087803b1580156112ff57600080fd5b505af1158015611313573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611337919061173c565b50604080516020810190915260018301548152835160009161135891610aa0565b604080516020810190915260055481529091506000906113789083610aa0565b6000546040516331a9108f60e11b8152600481018a90529192506001600160a01b038581169263a9059cbb92610100900490911690636352211e9060240160206040518083038186803b1580156113ce57600080fd5b505afa1580156113e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114069190611720565b6114108486611b58565b6040518363ffffffff1660e01b815260040161142d9291906118fa565b602060405180830381600087803b15801561144757600080fd5b505af115801561145b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061147f919061173c565b5060065460405163a9059cbb60e01b81526001600160a01b038581169263a9059cbb926114b4929091169085906004016118fa565b602060405180830381600087803b1580156114ce57600080fd5b505af11580156114e2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611506919061173c565b5050505050505050565b8051600090610ab89084906115276012600a611a91565b6115a9565b6000828152600460205260408120600101546001600160a01b03161580159061158a5750600083815260046020908152604091829020600101546001600160a01b03169161157f91908501908501611704565b6001600160a01b0316145b8015610ab8575050600091825260046020526040909120549035101590565b60006115bf826115b986866115c7565b906115d3565b949350505050565b6000610ab88284611b39565b6000610ab88284611a2e565b60405180604001604052806115f2611624565b8152600060209091015290565b6040518060400160405280611612611624565b815260200161161f611624565b905290565b6040518060200160405280600081525090565b600060408284031215611648578081fd5b604080519081016001600160401b038111828210171561167657634e487b7160e01b83526041600452602483fd5b60405290508061168684846116b8565b815261169584602085016116b8565b60208201525092915050565b6000608082840312156116b2578081fd5b50919050565b6000602082840312156116c9578081fd5b604051602081016001600160401b03811182821017156116f757634e487b7160e01b83526041600452602483fd5b6040529135825250919050565b600060208284031215611715578081fd5b8135610ab881611bba565b600060208284031215611731578081fd5b8151610ab881611bba565b60006020828403121561174d578081fd5b81518015158114610ab8578182fd5b60006040828403121561176d578081fd5b610ab88383611637565b60008060408385031215611789578081fd5b61179384846116b8565b946020939093013593505050565b6000602082840312156117b2578081fd5b5035919050565b6000602082840312156117ca578081fd5b5051919050565b600080604083850312156117e3578182fd5b8235915060208301356117f581611bba565b809150509250929050565b6000808284036060811215611813578283fd5b833592506040601f1982011215611828578182fd5b506020830190509250929050565b60008060608385031215611848578182fd5b823591506118598460208501611637565b90509250929050565b60008060a08385031215611874578182fd5b8235915061185984602085016116a1565b600080600060c08486031215611899578081fd5b833592506118aa85602086016116a1565b915060a08401356118ba81611bba565b809150509250925092565b600080604083850312156118d7578182fd5b50508035926020909101359150565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b60208082526013908201527213585c9ad95d0e881a5b9d985b1a5908189a59606a1b604082015260600190565b6020808252601990820152784d61726b65743a2050726f647563742063616c6c206f6e6c7960381b604082015260600190565b8135815260408101602083013561198981611bba565b6001600160a01b031660209290920191909152919050565b8151518152602091820151519181019190915260400190565b813581526080810160208301356119d081611bba565b6001600160a01b0390811660208401526040840135906119ef82611bba565b9081166040840152606084013590611a0682611bba565b8082166060850152505092915050565b60008219821115611a2957611a29611b6f565b500190565b600082611a4957634e487b7160e01b81526012600452602481fd5b500490565b600181815b80851115611a89578160001904821115611a6f57611a6f611b6f565b80851615611a7c57918102915b93841c9390800290611a53565b509250929050565b6000610ab88383600082611aa7575060016103ae565b81611ab4575060006103ae565b8160018114611aca5760028114611ad457611af0565b60019150506103ae565b60ff841115611ae557611ae5611b6f565b50506001821b6103ae565b5060208310610133831016604e8410600b8410161715611b13575081810a6103ae565b611b1d8383611a4e565b8060001904821115611b3157611b31611b6f565b029392505050565b6000816000190483118215151615611b5357611b53611b6f565b500290565b600082821015611b6a57611b6a611b6f565b500390565b634e487b7160e01b600052601160045260246000fd5b81358155600181016020830135611b9b81611bba565b81546001600160a01b0319166001600160a01b03919091161790555050565b6001600160a01b0381168114611bcf57600080fd5b5056fea26469706673582212201e68eef9a95ff9380ebaab13116fceb70f5c0e1d7eb11dad640f8ca629d4f9db64736f6c63430008040033";

export class Market__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    product_: string,
    currency_: string,
    fee_: { percent: { value: BigNumberish }; recipient: string },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Market> {
    return super.deploy(
      product_,
      currency_,
      fee_,
      overrides || {}
    ) as Promise<Market>;
  }
  getDeployTransaction(
    product_: string,
    currency_: string,
    fee_: { percent: { value: BigNumberish }; recipient: string },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      product_,
      currency_,
      fee_,
      overrides || {}
    );
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

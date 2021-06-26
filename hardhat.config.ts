import { HardhatUserConfig } from "hardhat/types/config";
import { removeConsoleLog } from 'hardhat-preprocessor';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
import 'hardhat-preprocessor';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
// import 'hardhat-tracer';
import "solidity-coverage";

require('dotenv').config();

const RINKEBY_PUBLIC_KEY = process.env.RINKEBY_PUBLIC_KEY || '';
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';
const NODE_ENV = process.env.NODE_ENV || 'development';

function isEnvDev() {
  return NODE_ENV.toLowerCase()  === 'development';
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      loggingEnabled: isEnvDev() ? true : false,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${RINKEBY_PUBLIC_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY]
    }
  },
  solidity: {
    compilers: [{
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
        }
      }
    }],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: 0,  // for use in hardhat-deploy
  },
  mocha: {
    timeout: 20000
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  },
  abiExporter: {
    path: './abi',
    clear: true,
    spacing: 2
  },
  preprocess: {
    eachLine: removeConsoleLog((hre) => {
      return hre.network.name !== 'hardhat' && hre.network.name !== 'localhost'
    }),
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API_KEY,
    enabled: (process.env.REPORT_GAS) ? true : false,
    showTimeSpent: true
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
};
export default config;

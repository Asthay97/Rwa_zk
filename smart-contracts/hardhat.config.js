require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('solidity-docgen');
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });
const { ALCHEMY_API_KEY, PRIVATE_KEY, ZKEVM_API_KEY, POLYGONSCAN_API_KEY,SCROLLSCAN_API_KEY, MANTLE_API_KEY, MNEMONIC } = process.env;

module.exports = {
  // docgen: { ... }, 
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20
      },
    },
  },
  allowUnlimitedContractSize: 'true',
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz", // testnet
      accounts: [process.env.PRIVATE_KEY ?? '']
    },
    zkEVM:{
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [process.env.PRIVATE_KEY ?? '']
    },
    X1: {
      url: "https://testrpc.x1.tech",
      accounts: [process.env.PRIVATE_KEY ?? '']
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0"
      },
      chainId: 44787
    }
  },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: process.env.POLYGONSCAN_API_KEY,
  //   }
  // },
  etherscan: {
    apiKey: {
      zkEVM: process.env.ZKEVM_API_KEY,
    }
  },
  // etherscan: {
  //   apiKey: {
  //     scrollSepolia: process.env.SCROLLSCAN_API_KEY,
  //   },
  //   customChains: [
  //     {
  //       network: 'scrollSepolia',
  //       chainId: 534351,
  //       urls: {
  //         apiURL: 'https://sepolia-blockscout.scroll.io/api',
  //         browserURL: 'https://sepolia-blockscout.scroll.io/',
  //       },
  //     },
  //   ],
  // },
//   etherscan: {
//     apiKey: process.env.MANTLE_API_KEY,
//     customChains: [
//         {
//             network: "mantleTest",
//             chainId: 5001,
//             urls: {
//             apiURL: "https://explorer.testnet.mantle.xyz/api",
//             browserURL: "https://explorer.testnet.mantle.xyz"
//             }
//         }
//     ]
// },
  // etherscan: {
  //   apiKey: {
  //     alfajores: "<CELOSCAN_API_KEY>",
  //   },
  //   customChains: [
  //     {
  //       network: "alfajores",
  //       chainId: 44787,
  //       urls: {
  //         apiURL: "https://api-alfajores.celoscan.io/api",
  //         browserURL: "https://alfajores.celoscan.io",
  //       },
  //     },
  //   ]
  // },
}

// npx hardhat verify [CONTRACT_ADDRESS] [...CONSTRUCTOR_ARGS] --network alfajores
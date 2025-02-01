import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const { LISK_SEPOLIA_RPC_URL, ACCOUNT_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    liskSepolia: {
      url: LISK_SEPOLIA_RPC_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }
  },
};

export default config;

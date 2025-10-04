// hardhat.config.js
import "dotenv/config"; // loads environment variables from .env
import "@nomicfoundation/hardhat-toolbox";

const config = {
  solidity: "0.8.20",
  networks: {
    hela: {
      url: "https://testnet-rpc.helachain.com", 
      chainId: 666888,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;

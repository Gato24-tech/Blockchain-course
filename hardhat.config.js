require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");

const { ALCHEMY_API_KEY, PRIVATE_KEY, ARBISCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    arbitrumSepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, // URL correcta
      accounts: [PRIVATE_KEY], // Clave privada de la wallet
      gas: 5000000, // Límite de gas
      gasPrice: 2000000000, // Precio del gas
    },
  },
  etherscan: {
    apiKey: {
      arbitrumOne: ARBISCAN_API_KEY, // Clave API de Arbiscan
    },
  },
};

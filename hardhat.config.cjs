require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, ARBISCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.24", // Asegúrate de que esta versión coincida con los contratos
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Configuración de la red local
    },
    arbitrumSepolia: {
      url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,ALCHEMY_API_KEY, // Dirección del nodo remoto (Alchemy)
      accounts: [PRIVATE_KEY], // Llave privada de la wallet
    },
  },
  etherscan: {
    apiKey: {
      arbitrumOne: ARBISCAN_API_KEY, // API key para verificar contratos en Arbiscan
    },
  },
};

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
      url: `${ALCHEMY_API_KEY}`, // Nota: Esto utiliza la variable del archivo .env
      accounts: [PRIVATE_KEY], // Llave privada de la wallet
    },
  },
  etherscan: {
    apiKey: {
      arbitrumOne: ARBISCAN_API_KEY, // API key para verificar contratos en Arbiscan
    },
  },
};

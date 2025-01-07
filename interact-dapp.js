const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Cambia si usas otra red
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
                { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" }
            ],
            "name": "ValueSet",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getValue",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }],
            "name": "setValue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "value",
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Conectar con el contrato
    const signer = provider.getSigner(0); // Cambia el índice si usas otra cuenta
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Leer el valor inicial
    const initialValue = await contract.getValue();
    console.log("Valor inicial:", initialValue);

    // Establecer un nuevo valor
    const tx = await contract.setValue(42);
    await tx.wait();
    console.log("Nuevo valor establecido:", await contract.getValue());
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});

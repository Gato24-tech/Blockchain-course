const ethers = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Dirección del contrato (actualízala tras desplegar el contrato)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // ABI del contrato
    const contractABI = [
        {
            "inputs": [],
            "name": "getValue", // Cambia según las funciones disponibles
            "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Llama a la función del contrato
    const value = await contract.getValue();
    console.log("El valor almacenado es:", value.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

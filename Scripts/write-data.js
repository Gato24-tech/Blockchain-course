const { ethers } = require("hardhat");

async function main() {
    // Dirección del contrato desplegado (reemplaza con la dirección de tu contrato)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // ABI del contrato (simplificado o generado al compilar)
    const abi = [
        {
            "inputs": [
                { "internalType": "uint256", "name": "_value", "type": "uint256" }
            ],
            "name": "setValue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Obtén el proveedor y el signer
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = provider.getSigner();

    // Conecta con el contrato usando el signer
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Llama a la función setValue
    const tx = await contract.setValue(42); // Cambia "42" por el valor que desees
    console.log("Transacción enviada:", tx.hash);

    // Espera a que la transacción sea confirmada
    const receipt = await tx.wait();
    console.log("Transacción confirmada:", receipt);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});

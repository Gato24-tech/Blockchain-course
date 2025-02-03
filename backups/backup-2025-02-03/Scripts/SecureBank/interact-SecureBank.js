const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    // Cargar la dirección del contrato desde deployments.json
    const deploymentsPath = path.join(__dirname, "../../deployments.json");
    const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));
    const contractAddress = deployments.localhost?.address;

    // Obtener el signer (propietario de la cuenta)
    const [owner] = await ethers.getSigners();

    // Conectar al contrato la dirección
    const SecureBank = await ethers.getContractFactory("SecureBank");
    const contract = SecureBank.attach(contractAddress);

    console.log(`Interacting with the contract at: ${contractAddress}`);
    console.log(`Owner address: ${owner.address}`);

    try {
        // Obtener el balance inicial
        let balance = await contract.getBalance(owner.address);
        console.log(`deposited ${ethers.utils.formatEther(balance)} ETH`);

        // Realizar un depósito
        const depositAmount = ethers.utils.parseEther("1.0");
        const depositTx = await contract.connect(owner).deposit({ value: depositAmount });
        await depositTx.wait();
        console.log(`Deposited ${ethers.utils.formatEther(depositAmount)} ETH`);

        // Consultar balance después del depósito
        balance = await contract.getBalance(owner.address);
        console.log(`Balance después del depósito: ${ethers.utils.formatEther(balance)} ETH`);
      } catch (error) {
        console.error("Error in the main script:", error)     
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

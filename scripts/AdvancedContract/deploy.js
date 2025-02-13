/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import hardhat from 'hardhat';

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contract with account:', deployer.address);

  const AdvancedContract = await ethers.getContractFactory('AdvancedContract');
  const advancedContract = await AdvancedContract.deploy();
  await advancedContract.deployed();

  const contractAddress = advancedContract.address;
  console.log('Contract deployed to:', contractAddress);

  // Obtener el ABI del contrato
  const artifactsPath = path.join(
    __dirname,
    '..',
    '..',
    'artifacts',
    'contracts',
    'AdvancedContract.sol',
    'AdvancedContract.json'
  );

  if (!fs.existsSync(artifactsPath)) {
    console.error(`No se encontró el archivo ABI en ${artifactsPath}`);
    return;
  }

  const artifact = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));
  const contractABI = artifact.abi;

  // Guardar en deployments.json
  const deploymentsPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'deployments.json');

  // Verificar si el directorio existe, si no, crearlo
  const deploymentsDir = path.dirname(deploymentsPath);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentData = {
    localhost: {
      address: contractAddress,
    },
    abi: contractABI, // Guardamos el ABI
  };

  fs.writeFileSync(deploymentsPath, JSON.stringify(deploymentData, null, 2));
  console.log('Deployment address and ABI saved to:', deploymentsPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

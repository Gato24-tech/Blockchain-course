import { ethers } from "ethers";
import deployments from "./deployments.json";

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask no está instalado");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log("Conectado con:", await signer.getAddress());
  return signer;
};

const getContract = async () => {
  const signer = await connectWallet();
  if (!signer) return null;

  const contract = new ethers.Contract(
    deployments.contractAddress,
    deployments.abi,
    signer
  );

  return contract;
};

export { connectWallet, getContract };

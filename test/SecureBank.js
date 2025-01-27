const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureBank Contract", function () {
  let SecureBank, secureBank, owner, addr1, addr2;

  beforeEach(async function () {
    // 1. Obtener el contrato y las cuentas
    SecureBank = await ethers.getContractFactory("SecureBank");
    [owner, addr1, addr2] = await ethers.getSigners();

    // 2. Desplegar el contrato con el owner
    secureBank = await SecureBank.deploy();
    await secureBank.deployed();
  });

  it("Should deploy the contract with the correct owner", async function () {
    // Verifica que el contrato se despliegue con el propietario correcto
    const contractOwner = await secureBank.owner(); // Modifica si el owner es privado
    expect(contractOwner).to.equal(owner.address); // Esperamos que el owner sea quien lo desplegó
  });
});

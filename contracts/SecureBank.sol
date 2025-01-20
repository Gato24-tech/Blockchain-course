// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecureBank {
    mapping(address => uint256) public balances;
    address public owner;

    // Constructor para inicializar el propietario
    constructor() {
        owner = msg.sender;
    }

    // Modificador para funciones exclusivas del propietario
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only owner");
        _;
    }

    // Función para depositar fondos
    function deposit() public payable {
        require(msg.value > 0, "Must deposit more than zero");
        balances[msg.sender] += msg.value;
    }

    // Función para retirar fondos
    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Actualizar estado primero
        balances[msg.sender] -= amount;

        // Realizar transferencia después
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }

    // Función para que el propietario retire todos los fondos
    function withdrawAll() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available");

        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Transfer failed");
    }

    // Obtener el saldo de un usuario
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}

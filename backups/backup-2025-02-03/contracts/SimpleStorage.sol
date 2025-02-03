// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedValue; // Valor almacenado
    address public owner; // Dirección del propietario

    event ValueChanged(uint256 newValue); // Evento al cambiar el valor
    event ValueReset(uint256 resetValue); // Evento al resetear el valor

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender; // Establece al deployer como propietario
    }

    // Función para establecer un valor
    function set(uint256 value) public onlyOwner {
        storedValue = value;
        emit ValueChanged(value);
    }

    // Función para obtener el valor almacenado
    function get() public view returns (uint256) {
        return storedValue;
    }

    // Nueva función para resetear el valor almacenado
    function reset() public onlyOwner {
        storedValue = 0; // Resetea el valor a 0
        emit ValueReset(storedValue);
    }
}

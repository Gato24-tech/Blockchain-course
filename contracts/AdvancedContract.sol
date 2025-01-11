// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AdvancedContract {
    uint256 private storedValue;
    uint256[] private valueHistory; // Historial de valores
    address private owner; // Dirección del propietario

    // Evento para registrar actualizaciones del valor
    event ValueUpdated(uint256 oldValue, uint256 newValue);

    // Modificador para restringir acceso solo al propietario
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only owner can set value");
        _;
    }

    // Constructor: Define al propietario y valor inicial
    constructor() {
        owner = msg.sender; // El propietario será quien despliegue el contrato
        storedValue = 0; // Valor inicial
        valueHistory.push(storedValue); // Registrar en el historial
    }

    // Función para obtener el propietario
    function getOwner() public view returns (address) {
        return owner;
    }

    // Función para obtener el valor almacenado
    function getValue() public view returns (uint256) {
        return storedValue;
    }

    // Función para actualizar el valor almacenado (solo propietario)
    function setValue(uint256 newValue) public onlyOwner {
        uint256 oldValue = storedValue;
        storedValue = newValue;
        valueHistory.push(newValue); // Guardar en el historial
        emit ValueUpdated(oldValue, newValue); // Emitir evento
    }

    // Función para incrementar el valor almacenado (solo propietario)
    function incrementValue(uint256 increment) public onlyOwner {
        uint256 oldValue = storedValue;
        storedValue += increment;
        valueHistory.push(storedValue); // Guardar en el historial
        emit ValueUpdated(oldValue, storedValue); // Emitir evento
    }

    // Función para obtener el historial de valores
    function getValueHistory() public view returns (uint256[] memory) {
        return valueHistory;
    }
}

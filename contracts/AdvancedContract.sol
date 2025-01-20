// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AdvancedContract {
    uint256 private storedValue;
    uint256[] private valueHistory; // Historial de valores
    address private owner; // Dirección del propietario

    // Eventos para registrar acciones
    event ValueUpdated(uint256 oldValue, uint256 newValue);
    event Incremented(uint256 oldValue, uint256 increment, uint256 newValue);
    event UnauthorizedAccess(address sender);

    // Modificador para restringir acceso solo al propietario
    modifier onlyOwner() {
        if (msg.sender != owner) {
            emit UnauthorizedAccess(msg.sender);
            revert("Not authorized: Only owner can set value");
        }
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

    // Función para establecer un nuevo valor (solo propietario)
    function setValue(uint256 newValue) public onlyOwner {
        require(newValue <= 1000, "Value exceeds limit");
        uint256 oldValue = storedValue; // Guardamos el valor antiguo
        storedValue = newValue;
        valueHistory.push(newValue); // Guardar en el historial
        emit ValueUpdated(oldValue, newValue); // Emitir evento
    }

    // Función para incrementar el valor almacenado (solo propietario)
    function incrementValue(uint256 increment) public onlyOwner {
        require(increment <= 1000, "Increment exceeds limit"); // Verifica el incremento mismo
        require(storedValue + increment <= 1000, "Value exceeds limit"); // Verifica el resultado
        uint256 oldValue = storedValue; // Guardamos el valor antiguo
        storedValue += increment;
        valueHistory.push(storedValue); // Guardar en el historial
        emit Incremented(oldValue, increment, storedValue); // Emitir evento
    }

    // Función para obtener el historial de valores
    function getValueHistory() public view returns (uint256[] memory) {
        return valueHistory;
    }
}

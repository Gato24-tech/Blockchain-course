// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdvancedContract {
    uint256 private storedValue;
    uint256[] private valueHistory; // Array para almacenar el historial de valores

    // Evento para registrar actualizaciones del valor
    event ValueUpdated(uint256 oldValue, uint256 newValue);

    constructor() {
        storedValue = 0;
        valueHistory.push(storedValue);
    }

    // Función para obtener el valor almacenado
    function getValue() public view returns (uint256) {
        return storedValue;
    }

    // Función para actualizar el valor almacenado
    function setValue(uint256 newValue) public {
        uint256 oldValue = storedValue;
        storedValue = newValue;
        valueHistory.push(newValue); // Guardar en el historial
        emit ValueUpdated(oldValue, newValue); // Emitir evento
    }

    // Función para incrementar el valor almacenado
    function incrementValue(uint256 increment) public {
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

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AdvancedContract {
    address public owner;
    uint256 public value; // Variable de estado para almacenar valores.
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ValueSet(uint256 newValue); // Evento  para cambios de valor.

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), owner);
    }

   modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized: Only owner can set value");
    _;
}


    function getOwner() public view returns (address) {
        return owner;
    }

    function setValue(uint256 _value) public onlyOwner {
        value = _value; // Asigna el valor.
        emit ValueSet(_value); // Emite el evento.
    }
    function getValue() public view returns (uint256) {
    return value;
}
function transferOwnership(address newOwner) public onlyOwner{
    require(newOwner !=address(0), "Invalid new owner address");
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
    }
 
}
   

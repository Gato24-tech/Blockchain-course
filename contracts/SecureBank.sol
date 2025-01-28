// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecureBank {
    mapping(address => uint256) private balances;

    // Depósito de fondos
    function deposit() external payable {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] += msg.value;
    }

    // Consulta del balance de un usuario
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    // Retiro de fondos
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecureBank {
    address private owner;

    mapping(address => uint256) private balances;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only owner");
        _;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        // Mejor manejo de errores
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) {
            balances[msg.sender] += amount; // Reembolsar si falla
            revert("Withdrawal failed");
        }
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    function withdrawAll() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is zero");
        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Withdrawal failed");
    }
}

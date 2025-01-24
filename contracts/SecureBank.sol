// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecureBank {
    mapping(address => uint256) public balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only owner");
        _;
    }
    event Deposit(address indexed user, uint256 amount);

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender,msg.value);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function withdrawAll() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available");
        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Transfer failed");
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageStore {
    address public owner;
    string private message;

    // Event emitted when a new message is stored
    event MessageStored(address indexed sender, string message);

    // Only the owner can execute functions marked with this modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Set the deployer as the owner upon contract creation
    constructor() {
        owner = msg.sender;
    }

    // Store a message (only owner can call this function)
    function storeMessage(string memory _message) public onlyOwner {
        require(bytes(_message).length > 0, "Message cannot be empty");
        message = _message;
        emit MessageStored(msg.sender, _message);
    }

    // Retrieve the stored message
    function retrieveMessage() public view returns (string memory) {
        return message;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PropertyToken {
    address public owner;
    uint256 public tokenPrice; // Price per token in wei
    mapping(address => uint256) public sharesOwned;

    event SharesBought(address indexed buyer, uint256 amount, uint256 totalCost);

    constructor(uint256 _tokenPrice) {
        owner = msg.sender;
        tokenPrice = _tokenPrice;
    }

    function buyShares(uint256 numTokens) public payable {
        require(msg.value == numTokens * tokenPrice, "Incorrect Ether amount sent");
        sharesOwned[msg.sender] += numTokens;
        emit SharesBought(msg.sender, numTokens, msg.value);
    }

    function withdraw() external { // use openzeppelin
        require(msg.sender == owner, "Only owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}

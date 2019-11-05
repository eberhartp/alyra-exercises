pragma solidity 0.5.11;

import "./ERC20.sol";

contract Crowdsale{
    mapping(address => uint256) public _investments;
    address payable private _wallet;
    ERC20 public tokenContract;

    constructor(address payable wallet) public {
        _wallet = wallet;
        tokenContract = new ERC20();
    }

    function() external payable {
        require(msg.sender != address(0), "Investor at address 0");
        require(msg.value != 0, "Investment of value 0");
        buyToken();
    }

    function buyToken() public payable {
        _investments[msg.sender] = msg.value;
        tokenContract.transfer(msg.sender, msg.value);
        _wallet.transfer(msg.value);
    }
}
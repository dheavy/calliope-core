// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TestERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestERC20", "TST") {
        _mint(msg.sender, initialSupply);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        // console.log("Transfer", _msgSender(), recipient, amount);
        return true;
    }
}

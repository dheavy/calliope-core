// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

library Utils {
    function isEmptyString(
        string calldata str_
    )
        external
        pure
        returns (bool)
    {
        bytes memory testable = bytes(str_);

        if (testable.length == 0) {
            return true;
        }
        return false;
    }

    function areStringEquals(
        string calldata str1_,
        string calldata str2_
    )
        external
        pure
        returns (bool)
    {
        return (
            keccak256(abi.encodePacked(str1_)) == keccak256(abi.encodePacked(str2_))
        );
    }
}

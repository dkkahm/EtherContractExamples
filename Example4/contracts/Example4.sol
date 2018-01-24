pragma solidity ^0.4.11;

contract Example4 {
    function sum(uint a, uint b) returns (uint) {
        uint result = a + b;
        return result;
    }

    function sum2() returns (uint result) {
        result = sum(5, 10);
    }
}


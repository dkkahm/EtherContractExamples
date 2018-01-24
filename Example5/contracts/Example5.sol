pragma solidity ^0.4.11;

contract Example5 {
    uint count;

    function Example5(uint _count) {
        count = _count;
    }

    function getCount() constant returns (uint) {
        return count;
    }

    function sum(uint a, uint b) returns (uint) {
        uint result = a + b;
        return result;
    }

    function sum2() returns (uint result) {
        result = sum(5, 10);
    }
}


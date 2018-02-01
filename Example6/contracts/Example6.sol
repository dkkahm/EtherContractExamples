pragma solidity ^0.4.11;

contract Parent {
	uint constant a = 10;
	function getA() constant returns (uint) {
		return a;
	}

	function f() constant returns (uint) {
		return a + 1;
	}
}

contract Example6 is Parent {
	function f() constant returns (uint) {
		return getA() + 3;
	}
}

pragma solidity ^0.4.8;

contract KeyValueStore {
	uint keyIndex;

	struct values {
		string value1;
		string value2;
	}

	mapping(uint => values) Obj;

	function setValue(string _value1, string _value2) public returns (uint) {
		Obj[keyIndex].value1 = _value1;
		Obj[keyIndex].value2 = _value2;
		++ keyIndex;
		return keyIndex;
	}

	function getValue1(uint _key) constant public returns (string) {
		return Obj[_key].value1;
	}

	function getValue2(uint _key) constant public returns (string) {
		return Obj[_key].value2;
	}

	function getKeyIndex() constant public returns (uint) {
		return keyIndex;
	}
}

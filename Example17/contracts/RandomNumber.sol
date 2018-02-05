pragma solidity ^0.4.8;

contract RandomNumber {
	uint public dummy;

	address owner;
	uint numberMax;

	struct draw {
		uint blockNumber;
	}

	struct draws {
		uint numDraws;
		mapping (uint => draw) draws;
	}

	mapping (address => draws) requests;

	event ReturnNextIndex(uint _index);

	function RandomNumber(uint _max) public {
		owner = msg.sender;
		numberMax = _max;
	}

	function request() public returns (uint) {
		uint _nextIndex = requests[msg.sender].numDraws;
		requests[msg.sender].draws[_nextIndex].blockNumber = block.number;
		requests[msg.sender].numDraws = _nextIndex + 1;

		ReturnNextIndex(_nextIndex);

		return _nextIndex;
	}

	function get(uint _index) public constant returns (int status, bytes32 blockhash, uint drawnNumber) {
		if(_index >= requests[msg.sender].numDraws) {
			return (-2, 0, 0);
		} else {
			uint _nextBlockNumber = requests[msg.sender].draws[_index].blockNumber + 1;

			if(_nextBlockNumber >= block.number) {
				return (-1, 0, 0);
			} else {
				bytes32 _blockhash = block.blockhash(_nextBlockNumber);
				uint _drawnNumber = uint(_blockhash) % numberMax + 1;
				return (0, _blockhash, _drawnNumber);
			}
		}
	}

	function getNumMax() public constant returns (uint) {
		return numberMax;
	}

	function getNumDraws() public constant returns (uint) {
		return requests[msg.sender].numDraws;
	}

	function getDrawInfo(uint _index) public constant returns (uint) {
		return requests[msg.sender].draws[_index].blockNumber;
	}

	function getBlockNumber() public constant returns (uint) {
		return block.number;
	}

	function getBlockhash(uint _index) public constant returns (bytes32) {
		return block.blockhash(_index);
	}

	function setDummy(uint _dummy) public {
		dummy = _dummy;
	}

	function getDummy() public constant returns (uint) {
		return dummy;
	}
}

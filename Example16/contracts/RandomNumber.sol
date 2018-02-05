pragma solidity ^0.4.8;

/*
contract RandomNumber {
	function get(uint max) public constant returns (uint, uint) {
		uint block_timestamp = block.timestamp;

		uint mod = block_timestamp % max + 1;

		return (block_timestamp, mod);
	}
}
*/

contract BlockHashTest {
	function getBlockHash(uint _blockNumber) public constant returns (bytes32 blockhash, uint blockahshToNumber) {
		bytes32 _blockhash = block.blockhash(_blockNumber);
		uint _blockhashToNumber = uint(_blockhash);
		return (_blockhash, _blockhashToNumber);
	}

	function getBlockNumber() public constant returns (uint) {
		return block.number;
	}
}

contract RandomNumber {
	uint public dummy;

	address owner;
	uint numberMax;

	struct draw {
		uint blockNumber;
		uint drawnNumber;
	}

	struct drawns {
		uint numDraws;
		mapping (uint => draw) draws;
	}

	mapping (address => drawns) requests;

	event ReturnNextIndex(uint _index);
	event ReturnDraw(int _status, bytes32 _blockhash, uint _drawnNumber);

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

	function get(uint _index) public returns (int status, bytes32 blockhash, uint drawnNumber) {
		if(_index >= requests[msg.sender].numDraws) {
			ReturnDraw(-2, 0, 0);
			return (-2, 0, 0);
		} else {
			uint _nextBlockNumber = requests[msg.sender].draws[_index].blockNumber + 1;

			if(_nextBlockNumber >= block.number) {
				ReturnDraw(-1, 0, 0);
				return (-1, 0, 0);
			} else {
				bytes32 _blockhash = block.blockhash(_nextBlockNumber);
				uint _drawnNumber = uint(_blockhash) % numberMax + 1;
				requests[msg.sender].draws[_index].drawnNumber = _drawnNumber;
				ReturnDraw(0, _blockhash, _drawnNumber);
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

	function getDrawInfo(uint _index) public constant returns (uint, uint) {
		return (requests[msg.sender].draws[_index].blockNumber, requests[msg.sender].draws[_index].drawnNumber);
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

	function add_to_dummy(uint _a) public returns (uint) {
		dummy = _a + dummy;
		return dummy;
	}
}

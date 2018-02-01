pragma solidity ^0.4.8;

contract Owned {
    address public owner;
    
    event TransferOwnership(address oldadddr, address newaddr);
    
    modifier onlyOwner() { if(msg.sender != owner) throw; _; }
    
    function Owned() public {
        owner = msg.sender;
    }
    
    function transferOwnership(address _new) onlyOwner public {
        address oldadddr = owner;
        owner = _new;
        TransferOwnership(oldadddr, owner);
    }
}

contract Members is Owned {
    address public coin;
    MemberStatus[] public status;
    mapping(address => History) public tradingHistory;
    
    struct MemberStatus {
        string name;
        uint256 times;
        uint256 sum;
        int8 rate;
    }
    
    struct History {
        uint256 times;
        uint256 sum;
        uint256 statusIndex;
    }
    
    modifier onlyCoin() { if(msg.sender == coin) _; }
    
    function setCoin(address _addr) onlyCoin public {
        coin = _addr;
    }
    
    function pushStatus(string _name, uint256 _times, uint256 _sum, int8 _rate) onlyOwner public {
        status.push(MemberStatus( {
            name: _name,
            times: _times,
            sum: _sum,
            rate: _rate
        }));
    }
    
    function getStatus(uint _index) constant public returns (string, uint256, uint256, int8) {
		if(_index < status.length) {
			return (status[_index].name, status[_index].times, status[_index].sum, status[_index].rate);
		}
    }
    
    function editStatus(uint256 _index, string _name, uint256 _times, uint256 _sum, int8 _rate) onlyOwner public {
        if(_index < status.length) {
            status[_index].name = _name;
            status[_index].times = _times;
            status[_index].sum = _sum;
            status[_index].rate = _rate;
        }
    }
    
    function updateHistory(address _member, uint256 _value) public {
        tradingHistory[_member].times += 1;
        tradingHistory[_member].sum += _value;
        
        uint256 index;
        int8 tmprate;
        for(uint i = 0; i < status.length; ++ i) {
            if(tradingHistory[_member].times >= status[i].times &&
                tradingHistory[_member].sum >= status[i].sum &&
                tmprate < status[i].rate) {
                index = i;        
            }
        }
        tradingHistory[_member].statusIndex = index;
    }
    
    function getCashbackRate(address _member) constant public returns (int8 rate) {
        rate = status[tradingHistory[_member].statusIndex].rate;
    }
    
    function getHistory(address _member) constant public returns (uint, uint) {
        return (tradingHistory[_member].times, tradingHistory[_member].sum);
    }
}

contract OreOreCoin is Owned {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping (address => uint256) public balanceOf;
    mapping (address => int8) public blackList;
    mapping (address => Members) public members;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Blacklisted(address indexed target);
    event DeleteFromBlacklist(address indexed target);
    event RejectedPaymentToBlacklistedAddr(address indexed from, address indexed to, uint256 value);
    event RejectedPaymentFromBlacklistedAddr(address indexed from, address indexed to, uint256 value);
    event Cashback(address indexed from, address indexed to, uint256 value);
    
    function OreOreCoin(uint256 _supply, string _name, string _symbol, uint8 _decimal) public {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimal;
        totalSupply = _supply;
        owner = msg.sender;
    }
    
    function blacklisting(address _addr) onlyOwner public {
        blackList[_addr] = 1;
        Blacklisted(_addr);
    }
    
    function deleteFromBlacklist(address _addr) onlyOwner public {
        blackList[_addr] = -1;
        DeleteFromBlacklist(_addr);
    }

    function setMembers(Members _members) public {
        members[msg.sender] = Members(_members);
    }    

    function transfer(address _to, uint256 _value) public {
        if(balanceOf[msg.sender] < _value) throw;
        if(balanceOf[_to] + _value < balanceOf[_to]) throw;
        
        if(blackList[msg.sender] > 0) {
            RejectedPaymentFromBlacklistedAddr(msg.sender, _to, _value);
        } else if(blackList[_to] > 0) {
            RejectedPaymentToBlacklistedAddr(msg.sender, _to, _value);
        } else {
            uint256 cashback = 0;
            if(members[_to] > address(0)) {
                cashback = _value / 100 * uint256(members[_to].getCashbackRate(msg.sender));
                members[_to].updateHistory(msg.sender, _value);
            }

            balanceOf[msg.sender] -= (_value - cashback);
            balanceOf[_to] += (_value - cashback);
            
            Transfer(msg.sender, _to, _value);
            Cashback(_to, msg.sender, cashback);
        }
    }
    
    function getCacheback(address _to, uint256 _value) constant public returns (uint256) {
        uint256 cashback = 0;
        if(members[_to] > address(0)) {
            cashback = _value / 100 * uint256(members[_to].getCashbackRate(msg.sender));
        }
        return cashback;
    }
    
    function close() onlyOwner public {
        selfdestruct(owner);
    }
    
    function getMemebrs(address _store) constant public returns (address) {
        return members[_store];
    }
    
    function isMemebrsSet(address _store) constant public returns (bool) {
        return (members[_store] > address(0));
    }
    
    function getHistory(address _store, address _member) constant public returns (uint, uint) {
        return members[_store].getHistory(_member);
    }
    
    function getRate(address _store, address _member) constant public returns (int8) {
        return members[_store].getCashbackRate(_member);
    }
}


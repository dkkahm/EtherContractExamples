var Members = artifacts.require("Members");
var OreOreCoin = artifacts.require("OreOreCoin");
 var Crowdsale = artifacts.require("Crowdsale");

contract('Crowdsale', function(accounts) {
  it("should assert true", async function() {
	console.log(accounts);

	var oc = await OreOreCoin.new(10000, "OreOreCoin", "oc", 0);
	console.log("oc is at " + oc.address);

	var balance_0 = await oc.balanceOf.call(accounts[0]);
	console.log("balance_0 = " + balance_0);

	var cs = await Crowdsale.new(10, 5000, 100, oc.address);
	console.log("crowdsale is at " + cs.address);

	oc.transfer(cs.address, 5000);
	balance_0 = await oc.balanceOf.call(accounts[0]);
	var balance_cs = await oc.balanceOf.call(cs.address);
	console.log("balance_0 = " + balance_0);
	console.log("balance_cs = " + balance_cs);

	var cs_info = await cs.getBaseInfo();
	console.log("cs_info = " + cs_info);

	var du_info = await cs.getDurationUnits();
	console.log("du_info = " + du_info);

	await cs.setDurationUnits(1);
	du_info = await cs.getDurationUnits();
	console.log("du_info = " + du_info);

	await cs.start(5);

	var token_info = await cs.getRemaingTimeEthToken.call();
	console.log("token_info = " + token_info);

	web3.eth.sendTransaction({from:accounts[1], to:cs.address, value:web3.toWei(5, "ether")})
	token_info = await cs.getRemaingTimeEthToken.call();
	console.log("token_info = " + token_info);

	web3.eth.sendTransaction({from:accounts[2], to:cs.address, value:web3.toWei(5, "ether")})
	token_info = await cs.getRemaingTimeEthToken.call();
	console.log("token_info = " + token_info);

	console.log('waiting 6 seconds');
	await (new Promise(function(resolve, reject) {
    	setTimeout(function(){
			resolve();
		}, 6 * 1000);
	}));
	console.log('waiting over.');

	await cs.checkGoalReached();

	var funding_info = await cs.getFundingInfo();
	console.log('funding_info = ' + funding_info);

	var ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	console.log('ether_0 = ' + ether_0);

	await cs.withdrawalOwner();

	ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	console.log('ether_0 = ' + ether_0);

	balance_cs = await oc.balanceOf.call(cs.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	balance_2 = await oc.balanceOf.call(accounts[2]);
	console.log('balance_cs = ' + balance_cs);
	console.log('balance_1 = ' + balance_1);
	console.log('balance_2 = ' + balance_2);

	await cs.withdrawl({from:accounts[1]});
	await cs.withdrawl({from:accounts[2]});

	balance_cs = await oc.balanceOf.call(cs.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	balance_2 = await oc.balanceOf.call(accounts[2]);
	console.log('balance_cs = ' + balance_cs);
	console.log('balance_1 = ' + balance_1);
	console.log('balance_2 = ' + balance_2);

    assert.isTrue(true);
  });

  it("should assert true", async function() {
	console.log(accounts);

	var oc = await OreOreCoin.new(10000, "OreOreCoin", "oc", 0);
	console.log("oc is at " + oc.address);

	var balance_0 = await oc.balanceOf.call(accounts[0]);
	console.log("balance_0 = " + balance_0);

	var cs = await Crowdsale.new(10, 5000, 100, oc.address);
	console.log("crowdsale is at " + cs.address);

	oc.transfer(cs.address, 5000);
	balance_0 = await oc.balanceOf.call(accounts[0]);
	var balance_cs = await oc.balanceOf.call(cs.address);
	console.log("balance_0 = " + balance_0);
	console.log("balance_cs = " + balance_cs);

	var cs_info = await cs.getBaseInfo();
	console.log("cs_info = " + cs_info);

	var du_info = await cs.getDurationUnits();
	console.log("du_info = " + du_info);

	await cs.setDurationUnits(1);
	du_info = await cs.getDurationUnits();
	console.log("du_info = " + du_info);

	await cs.start(5);

	var token_info = await cs.getRemaingTimeEthToken.call();
	console.log("token_info = " + token_info);

	web3.eth.sendTransaction({from:accounts[1], to:cs.address, value:web3.toWei(5, "ether")})
	token_info = await cs.getRemaingTimeEthToken.call();
	console.log("token_info = " + token_info);

	console.log('waiting 6 seconds');
	await (new Promise(function(resolve, reject) {
    	setTimeout(function(){
			resolve();
		}, 6 * 1000);
	}));
	console.log('waiting over.');

	await cs.checkGoalReached();

	var funding_info = await cs.getFundingInfo();
	console.log('funding_info = ' + funding_info);

	var ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	var ether_1 = web3.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
	console.log('ether_0 = ' + ether_0);
	console.log('ether_1 = ' + ether_1);

	balance_cs = await oc.balanceOf.call(cs.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	console.log('balance_cs = ' + balance_cs);
	console.log('balance_1 = ' + balance_1);

	await cs.withdrawalOwner();
	await cs.withdrawl({from:accounts[1]});

	ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	ether_1 = web3.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
	console.log('ether_0 = ' + ether_0);
	console.log('ether_1 = ' + ether_1);

	balance_cs = await oc.balanceOf.call(cs.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	console.log('balance_cs = ' + balance_cs);
	console.log('balance_1 = ' + balance_1);

    assert.isTrue(true);
  });
});

var Members = artifacts.require("Members");
var OreOreCoin = artifacts.require("OreOreCoin");
 var Escrow = artifacts.require("Escrow");

contract('Escrow', function(accounts) {
  it("should assert true", async function() {
	console.log(accounts);

	var oc = await OreOreCoin.new(10000, "OreOreCoin", "oc", 0);
	console.log("oc is at " + oc.address);

	var balance_0 = await oc.balanceOf.call(accounts[0]);
	console.log("balance_0 = " + balance_0);

	var es = await Escrow.new(oc.address, 2000, 10);
	console.log("es is at " + es.address);

	oc.transfer(es.address, 2000);
	balance_0 = await oc.balanceOf.call(accounts[0]);
	var balance_es = await oc.balanceOf.call(es.address);
	console.log("balance_0 = " + balance_0);
	console.log("balance_es = " + balance_es);

	var es_info = await es.getBaseInfo();
	console.log("es_info = " + es_info);

	var du_info = await es.getDurationUnits();
	console.log("du_info = " + du_info);

	await es.setDurationUnits(1);
	du_info = await es.getDurationUnits();
	console.log("du_info = " + du_info);

	await es.start(5);

	var tr_info = await es.getTradingInfo.call();
	console.log("tr_info = " + tr_info);

	balance_es = await oc.balanceOf.call(es.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	balance_2 = await oc.balanceOf.call(accounts[2]);
	console.log('balance_es = ' + balance_es);
	console.log('balance_1 = ' + balance_1);
	console.log('balance_2 = ' + balance_2);

	// var is_payable = await es.isPayable.call();
	// console.log("is_payable = " + is_payable);

	try {
		web3.eth.sendTransaction({from:accounts[1], to:es.address, value:web3.toWei(5, "ether")})

		tr_info = await es.getTradingInfo.call();
		console.log("tr_info = " + tr_info);
	} catch (error) {
		console.log("Expected revert:" + error.message);
	}

	web3.eth.sendTransaction({from:accounts[2], to:es.address, value:web3.toWei(10, "ether")})
	tr_info = await es.getTradingInfo.call();
	console.log("tr_info = " + tr_info);

	balance_es = await oc.balanceOf.call(es.address);
	balance_1 = await oc.balanceOf.call(accounts[1]);
	balance_2 = await oc.balanceOf.call(accounts[2]);
	console.log('balance_es = ' + balance_es);
	console.log('balance_1 = ' + balance_1);
	console.log('balance_2 = ' + balance_2);

	var ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	var balance_0 = await oc.balanceOf.call(accounts[0]);
	console.log('ether_0 = ' + ether_0);
	console.log('balance_0 = ' + balance_0);

	await es.close();

	ether_0 = web3.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
	balance_0 = await oc.balanceOf.call(accounts[0]);
	console.log('ether_0 = ' + ether_0);
	console.log('balance_0 = ' + balance_0);

    assert.isTrue(true);
  });
});

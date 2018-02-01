const Members = artifacts.require('Members')
const OreOreCoin = artifacts.require('OreOreCoin')

contract('OreOreCoin', function(accounts) {
	console.log(accounts);

	var MembersInstance = null;
	var OreOreCoinInstance = null;

	beforeEach('setup contract for each test', async() => {
		MembersInstance = await Members.new();
		OreOreInstance = await OreOreCoin.new(10000, "OreOreCoin", "oc", 0);
	});

	it("should assert true", async() => {
		var members_address = MembersInstance.address;
		console.log("members is at " + members_address);

		var members_owner = await MembersInstance.owner.call();
		console.log("members owner is " + members_owner);

		// await MembersInstance.pushStatus('Bronze', 0, 0, 0, {from:accounts[0]});
		await MembersInstance.pushStatus('Bronze', 0, 0, 0);
		await MembersInstance.pushStatus('Silver', 5, 500, 5);
		await MembersInstance.pushStatus('Gold', 15, 1500, 10);

		await MembersInstance.transferOwnership(accounts[1]);

		members_owner = await MembersInstance.owner.call();
		console.log("members owner is " + members_owner);

		await OreOreInstance.setMembers(members_address, {from:accounts[1]});

		await OreOreInstance.transfer(accounts[1], 100);
		await OreOreInstance.transfer(accounts[1], 100);
		await OreOreInstance.transfer(accounts[1], 100);
		await OreOreInstance.transfer(accounts[1], 100);
		await OreOreInstance.transfer(accounts[1], 100);

		var rate = await MembersInstance.getCashbackRate(accounts[0]);
		console.log(rate);

		var balance_0 = await OreOreInstance.balanceOf.call(accounts[0]);
		var balance_1 = await OreOreInstance.balanceOf.call(accounts[1]);
		console.log(balance_0);
		console.log(balance_1);

		await OreOreInstance.transfer(accounts[1], 100);

		rate = await MembersInstance.getCashbackRate(accounts[0]);
		console.log(rate);

		balance_0 = await OreOreInstance.balanceOf.call(accounts[0]);
		balance_1 = await OreOreInstance.balanceOf.call(accounts[1]);
		console.log(balance_0);
		console.log(balance_1);

		await OreOreInstance.transfer(accounts[1], 100);

		rate = await MembersInstance.getCashbackRate(accounts[0]);
		console.log(rate);

		balance_0 = await OreOreInstance.balanceOf.call(accounts[0]);
		balance_1 = await OreOreInstance.balanceOf.call(accounts[1]);
		console.log(balance_0);
		console.log(balance_1);

	//	var state_0 = MembersInstance.getStatus(0, {from:accounts[0]});
	//	console.log(status_0);
	//	var state_1 = MembersInstance.getStatus(1, {from:accounts[0]});
	//	console.log(status_1);
	//	var state_2 = MembersInstance.getStatus(2, {from:accounts[0]});
	//	console.log(status_2);

    	assert.isTrue(true);
  	});
});

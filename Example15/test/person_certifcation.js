var PersonCertification = artifacts.require("PersonCertification");

contract('PersonCertification', function(accounts) {
  it("should assert true", async function() {
  	console.log(accounts);

    var cert = await PersonCertification.new();

	await cert.setPerson("Name1", "Birth1");

	await cert.setOrganization("Org1", {from:accounts[1]});
	await cert.setBelong(accounts[0], {from:accounts[1]});

	await cert.setOrganization("Org2", {from:accounts[2]});
	await cert.setBelong(accounts[0], {from:accounts[2]});

	var person = await cert.getPerson(accounts[0]);
	console.log('admin:' + person);

	var block_number = await cert.getBlockNumber();
	console.log('block_number = ' + block_number);

	await cert.setApprove(accounts[3], 2);

	var block_number = await cert.getBlockNumber();
	console.log('block_number = ' + block_number);

	person = await cert.getPerson(accounts[0], {from:accounts[3]});
	console.log('approved:' + person);

	person = await cert.getPerson(accounts[0], {from:accounts[4]});
	console.log('not approved:' + person);

	var block_number = await cert.getBlockNumber();
	console.log('block_number = ' + block_number);

	await cert.setDummy(1);
	await cert.setDummy(1);

	var block_number = await cert.getBlockNumber();
	console.log('block_number = ' + block_number);

	person = await cert.getPerson(accounts[0], {from:accounts[3]});
	console.log('approved - time_over:' + person);

    assert.isTrue(true);
  });
});

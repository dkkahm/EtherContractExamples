var RandomNumber = artifacts.require("RandomNumber");

contract('RandomNumber', function(accounts) {
  it("should assert true", async function() {
  	console.log(accounts);

    var rn = await RandomNumber.new(6);

	var block_number = await rn.getBlockNumber();
	console.log('block_number = ' + block_number);

	await rn.setDummy(5);

	var dummy = await rn.dummy.call();
	console.log('dummy = ' + dummy);

	block_number = await rn.getBlockNumber();
	console.log('block_number = ' + block_number);

	var rst = await rn.add_to_dummy(7); // working
	// var rst = await rn.add_to_dummy.call(7); // working
	// console.log(typeof(rst));
	// console.log(JSON.stringify(rst));

	dummy = await rn.dummy.call();
	console.log('dummy = ' + dummy);

	block_number = await rn.getBlockNumber();
	console.log('block_number = ' + block_number);

	dummy = await rn.dummy.call();
	console.log('dummy = ' + dummy);

    assert.isTrue(true);
  });
});

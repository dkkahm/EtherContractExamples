var BlockHashTest = artifacts.require("BlockHashTest");

contract('BlockHashTest', function(accounts) {
  it("should assert true", async function() {
  	console.log(accounts);

    var bht = await BlockHashTest.new();

	var bn = await bht.getBlockNumber();
	console.log('bn = ' + bn);

	var bh = await bht.getBlockHash(bn - 1);
	console.log('bh = ' + bh);

    assert.isTrue(true);
  });
});

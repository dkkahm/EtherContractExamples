var RandomNumber = artifacts.require("RandomNumber");

contract('RandomNumber', function(accounts) {
  it("should assert true", async function() {
  	console.log(accounts);

    var rn = await RandomNumber.new(6);

	var num_max = await rn.getNumMax();
	console.log('num_max = ' + num_max);

	var num_draws = await rn.getNumDraws();
	console.log('num_draws = ' + num_draws);

	var block_number = await rn.getBlockNumber();
	console.log('0.block_number = ' + block_number);

	await rn.request(); // working

	block_number = await rn.getBlockNumber();
	console.log('block_number = ' + block_number);

	while(true) {
		var result = await rn.get.call(0);
		console.log('result = ' + result);

		if(result[0].toNumber() == 0) break;

		// var result = await rn.get.call(0);
		// console.log('result = ' + result);

		await rn.setDummy(0);

		if(false) {
			await (new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve();
				}, 5000);
			}));
		}
	}

	block_number = await rn.getBlockNumber();
	console.log('1.block_number = ' + block_number);

	var num_draws = await rn.getNumDraws();
	console.log('num_draws = ' + num_draws);

	var draw_info = await rn.getDrawInfo(0);
	console.log('draw_info = ' + draw_info);

	var result = await rn.get.call(0);
	console.log('result = ' + result);

	block_number = await rn.getBlockNumber();
	console.log('0.block_number = ' + block_number);

    assert.isTrue(true);
  });
});

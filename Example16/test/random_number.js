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

	var rst = await rn.request(); // working
	// var rst = await rn.request.call(); // working
	console.log(typeof(rst));
	console.log(JSON.stringify(rst));

	block_number = await rn.getBlockNumber();
	console.log('1.block_number = ' + block_number);

	var valid_block_number = Number(block_number) + 2
	while(Number(block_number) < valid_block_number) {
		// var result = await rn.get.call(0);
		// console.log('result = ' + result);

		// rn.setDummy(0);

		block_number = await rn.getBlockNumber();
		console.log('2.block_number = ' + block_number + ',v=' + valid_block_number);

		await (new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, 5000);
		}));
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

	rst = await rn.request(); // working
	// rst = await rn.request.call(); // working
	console.log(typeof(rst));
	console.log(JSON.stringify(rst));

	block_number = await rn.getBlockNumber();
	console.log('1.block_number = ' + block_number);

	valid_block_number = Number(block_number) + 2
	while(Number(block_number) < valid_block_number) {
		// var result = await rn.get.call(0);
		// console.log('result = ' + result);

		// rn.setDummy(0);

		block_number = await rn.getBlockNumber();
		console.log('2.block_number = ' + block_number + ',v=' + valid_block_number);

		await (new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, 5000);
		}));
	}

	block_number = await rn.getBlockNumber();
	console.log('1.block_number = ' + block_number);

	var num_draws = await rn.getNumDraws();
	console.log('num_draws = ' + num_draws);

	var draw_info = await rn.getDrawInfo(1);
	console.log('draw_info = ' + draw_info);

	var result = await rn.get.call(0);
	console.log('result = ' + result);

    assert.isTrue(true);
  });
});

var KeyValueStore = artifacts.require("KeyValueStore");

contract('KeyValueStore', function(accounts) {
 /*
  it("should assert true", async function(done) {

    var store = await KeyValueStore.deployed();

	var index = await store.getKeyIndex();
	console.log("index = " + index);

	index = await store.setValue("Hello", "World");
	console.log("index = " + index);

	for(var prop in index) {
		console.log("index[" + prop + "] = " + index[prop]);
	}

	var index = await store.getKeyIndex();
	console.log("index = " + index);

	var value1 = await store.getValue1(0);
	var value2 = await store.getValue2(0);
	console.log("value1 = " + value1);
	console.log("value2 = " + value2);

    assert.isTrue(true);
    done();
  });
  */
  it("should assert true", async function(done) {

    var store = await KeyValueStore.new();

	var index = await store.getKeyIndex();
	console.log("index = " + index);

	store.setValue("Hello", "World").then(function(result) {
		var str = JSON.stringify(result);
		console.log(str);
	});

	var index = await store.getKeyIndex();
	console.log("index = " + index);

	var value1 = await store.getValue1(0);
	var value2 = await store.getValue2(0);
	console.log("value1 = " + value1);
	console.log("value2 = " + value2);

    assert.isTrue(true);
    done();
  });
});

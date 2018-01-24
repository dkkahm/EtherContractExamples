var Example4 = artifacts.require('./Example4.sol');

contract('Example4', function(accounts) {
  it("should assert true", async function() {
    const contract = await Example4.deployed();
    const result = await contract.sum2.call();
    assert.isTrue(result == 15);
  });
});


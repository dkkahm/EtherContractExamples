var Example6 = artifacts.require('./Example6.sol');

contract('Example6', function(accounts) {
  it("should assert true", async function() {
    const contract = await Example6.deployed();
    const result = await contract.f.call();
    assert.isTrue(result == 13);
  });
});


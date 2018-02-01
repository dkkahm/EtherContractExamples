var Parent = artifacts.require('./Example6.sol');

contract('Example6', function(accounts) {
  it("should assert true", async function() {
    const contract = await Parent.deployed();
    const result = await contract.f.call();
    assert.isTrue(result == 11);
  });
});


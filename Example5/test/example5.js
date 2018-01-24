"use strict";
const Example5 = artifacts.require('./Example5.sol');

contract('Example5', function(accounts) {
    var Example5Instance = null;

    beforeEach('setup contract for each test', async() => {
        Example5Instance = await Example5.new(333)
    })

    it('should have count initialized', async() => {
        var count = await Example5Instance.getCount.call();
        assert.equal(count, 333);
    })
});


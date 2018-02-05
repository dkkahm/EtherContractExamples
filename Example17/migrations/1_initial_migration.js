var Migrations = artifacts.require("./Migrations.sol");
var RandomNumber = artifacts.require("RandomNumber");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(RandomNumber, 6);
};

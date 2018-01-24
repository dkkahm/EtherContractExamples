var Migrations = artifacts.require("./Migrations.sol");
var Example5 = artifacts.require("./Example5.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Example5);
};


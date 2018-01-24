var Migrations = artifacts.require("./Migrations.sol");
var Example4 = artifacts.require("./Example4.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Example4);
};


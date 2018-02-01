var Migrations = artifacts.require("./Migrations.sol");
var Example6 = artifacts.require("./Example6.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Example6);
};

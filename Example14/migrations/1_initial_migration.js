var Migrations = artifacts.require("./Migrations.sol");
var KeyValueStore = artifacts.require("KeyValueStore");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KeyValueStore);
};

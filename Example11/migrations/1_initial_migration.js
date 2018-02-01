var Migrations = artifacts.require("./Migrations.sol");
var Members = artifacts.require("Members");
var OreOreCoin = artifacts.require("OreOreCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Members);
  deployer.deploy(OreOreCoin);
};

var Migrations = artifacts.require("./Migrations.sol");
var Members = artifacts.require("Members");
var OreOreCoin = artifacts.require("OreOreCoin");
var Escrow = artifacts.require('Escrow');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Members);
  deployer.deploy(OreOreCoin, 10000, "OreOreCoin", "oc", 0).then(function() {
  	deployer.deploy(Escrow, OreOreCoin.address, 2000, 10);
  });
};

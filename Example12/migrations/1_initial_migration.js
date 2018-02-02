var Migrations = artifacts.require("./Migrations.sol");
var Members = artifacts.require("Members");
var OreOreCoin = artifacts.require("OreOreCoin");
var Crowdsale = artifacts.require("Crowdsale");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Members);
  deployer.deploy(OreOreCoin, 10000, "OreOreCoin", "oc", 0).then(function() {
  	deployer.deploy(Crowdsale, 10, 5000, 10, OreOreCoin.address);
  });
};

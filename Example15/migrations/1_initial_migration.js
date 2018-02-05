var Migrations = artifacts.require("./Migrations.sol");
var PersonCertification = artifacts.require("PersonCertification");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(PersonCertification);
};

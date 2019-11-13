const SceneOuverte = artifacts.require("./SceneOuverte.sol");

module.exports = function(deployer) {
  deployer.deploy(SceneOuverte);
};

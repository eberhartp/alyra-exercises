const { BN, ether } = require("@openzeppelin/test-helpers");

const { expect } = require("chai");

const ERC20 = artifacts.require("ERC20");

contract("ERC20", function(accounts) {
    const _name = "ERC20 Token";
    const _symbol = "E20";
    const _decimals = new BN(18);
    const _owner = accounts[0];
    const _recipient = accounts[1];

    beforeEach(async function() {
        this.ERC20Instance = await ERC20.new({from : _owner});
    });

    it("a un nom", async function() {
        expect(await this.ERC20Instance.name()).to.equal(_name);
    });

    it("a un symbole", async function() {
        expect(await this.ERC20Instance.symbol()).to.equal(_symbol);
    });

    it("a une valeur décimale", async function() {
        expect(await this.ERC20Instance.decimals()).to.be.bignumber.equal(_decimals);
    });

    it("vérifie la balance du propriétaire du contrat", async function() {
        let totalSupply = await this.ERC20Instance.totalSupply();
        let ownerBalance = await this.ERC20Instance.balanceOf(_owner);
        expect(ownerBalance).to.be.bignumber.equal(totalSupply);
    });

    it("vérifie les balances après transfert", async function() {
        let totalSupply = await this.ERC20Instance.totalSupply();
        let ownerBalance = await this.ERC20Instance.balanceOf(_owner);
        let recipientBalance = await this.ERC20Instance.balanceOf(_recipient);
        expect(ownerBalance).to.be.bignumber.equal(totalSupply);
        expect(recipientBalance).to.be.bignumber.equal("0");
        await this.ERC20Instance.transfer(_recipient, new BN("1000"));
        ownerBalance = await this.ERC20Instance.balanceOf(_owner);
        recipientBalance = await this.ERC20Instance.balanceOf(_recipient);
        expect(ownerBalance).to.be.bignumber.equal(totalSupply.sub(new BN("1000")));
        expect(recipientBalance).to.be.bignumber.equal(new BN("1000"));
    });

    it("vérifie l'approval du propriétaire", async function() {
        await this.ERC20Instance.approve(_recipient, new BN("1000"));
        expect(await this.ERC20Instance.allowance(_owner, _recipient)).to.be.bignumber.equal(new BN("1000"));
    });

    it("vérifie l'approval et les balances après transferFrom", async function() {
        await this.ERC20Instance.approve(_recipient, new BN("1000"));
        let totalSupply = await this.ERC20Instance.totalSupply();
        let ownerBalance = await this.ERC20Instance.balanceOf(_owner);
        let recipientBalance = await this.ERC20Instance.balanceOf(_recipient);
        expect(ownerBalance).to.be.bignumber.equal(totalSupply);
        expect(recipientBalance).to.be.bignumber.equal("0");
        expect(await this.ERC20Instance.allowance(_owner, _recipient)).to.be.bignumber.equal(new BN("1000"));
        await this.ERC20Instance.transferFrom(_owner, _recipient, new BN("1000"), {
            from : _recipient
        });
        ownerBalance = await this.ERC20Instance.balanceOf(_owner);
        recipientBalance = await this.ERC20Instance.balanceOf(_recipient);
        expect(ownerBalance).to.be.bignumber.equal(totalSupply.sub(new BN("1000")));
        expect(recipientBalance).to.be.bignumber.equal(new BN("1000"));
        expect(await this.ERC20Instance.allowance(_owner, _recipient)).to.be.bignumber.equal(new BN("0"));

    });
});
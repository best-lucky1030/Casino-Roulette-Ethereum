const { bigNumberify } = require('ethers/utils');
const getPermitArgs = require('./getPermitArgs');
const Roulette = artifacts.require('Roulette');
const daiMockInteractor = require('./daiMockInteractor');

function expandTo18Decimals(n) {
  return bigNumberify(n).mul(bigNumberify(10).pow(18))
}

function collapseTo18Decimals(n) {
  return bigNumberify(n).div(bigNumberify(10).pow(18))
}

module.exports = {
  async addLiquidity(wallet, amount) {
    const roulette = await Roulette.deployed();
    return await roulette.addLiquidity(
      ...(await getPermitArgs({
        token: await daiMockInteractor.getToken(),
        spenderAddress: roulette.address,
        owner: wallet,
        amount: expandTo18Decimals(amount).toString()
      }))
    );
  },
  async removeLiquidity(wallet) {
    const roulette = await Roulette.deployed();
    return await roulette.removeLiquidity({ from: wallet.address });
  },
  async getTotalLiquidity() {
    const roulette = await Roulette.deployed();
    return await daiMockInteractor.balanceOf(roulette.address);
  },
  async mintDAI(amount) {
    const roulette = await Roulette.deployed();
    return await daiMockInteractor.mint(roulette.address, amount);
  },
  async burnDai(amount) {
    const roulette = await Roulette.deployed();
    return await daiMockInteractor.burn(roulette.address, amount);
  },
};

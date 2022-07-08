const Ethergram = artifacts.require('./Ethergram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Ethergram', ([deployer, author, tipper]) => {
  let ethergram

  before(async () => {
    ethergram = await Ethergram.deployed()
  })

  describe('Deployment', async () => {
    it('Deploys Successfully', async () => {
      const address = await Ethergram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('Has Name', async () => {
      const name = await ethergram.name()
      assert.equal(name, 'Ethergram')
    })
  })
})
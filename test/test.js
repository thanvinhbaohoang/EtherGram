const { assert } = require('chai')

const Ethergram = artifacts.require('./Ethergram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Ethergram', ([deployer, author, tipper]) => {
  let ethergram

  before(async () => {
    ethergram = await Ethergram.deployed()
  })

  // =========== DEPLOYMENT ============
  describe('DEPLOYMENT', async () => {
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


    // ============== IMAGES =============
    describe('IMAGES', async () => {
      let result;
      it('Create Images', async () => {
        result = await ethergram.uploadImage()
        let image = await ethergram.images(1);
        console.log(image)
      })
    })
    




     // ============ TIPPING =============
     describe('IMAGES', async () => {
    })
})
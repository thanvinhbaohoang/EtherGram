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
      let result, test_imageCount;
      const test_hash = 'abc123'
      const test_description = 'Image description'
      const test_tipAmount = '0'

      before(async () => {
        // ACTIONS
        result = await ethergram.uploadImage(test_hash, test_description,  {from: author});
        test_imageCount = await ethergram.imageCount()
      })

      it('Create Images', async () => {
        // SUCCESS
        const event = result.logs[0].args // Get Info if Image Struct after calling uploadImage()
        assert.equal(event.id.toNumber(), test_imageCount.toNumber(), 'id is correct')
        assert.equal(event.hash_string, test_hash, 'Hash is correct')
        assert.equal(event.description,test_description, 'Description is correct')
        assert.equal(event.tipAmount,test_tipAmount, 'Tip Amount is correct')
        assert.equal(event.author, author, 'Author is correct')

        // FAILURE: Image must have hash
        await ethergram.uploadImage('', test_description, {from:author}).should.be.rejected;
        // FAILURE: Image must have description
        await ethergram.uploadImage('', '', {from:author}).should.be.rejected;
      })

      it('Lists Images', async () => {
        const image = await ethergram.images(test_imageCount);
        assert.equal(image.id.toNumber(), test_imageCount.toNumber(), 'id is correct')
        assert.equal(image.hash_string, test_hash, 'Hash is correct')
        assert.equal(image.description,test_description, 'Description is correct')
        assert.equal(image.tipAmount,test_tipAmount, 'Tip Amount is correct')
        assert.equal(image.author, author, 'Author is correct')
      })
    })
    

     // ============ TIPPING =============
     describe('IMAGES', async () => {
    })
})
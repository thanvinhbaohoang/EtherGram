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
      let result, imageCount;
      const hash = 'abc123'
      const description = 'Image description'
      const tipAmount = '0'

      before(async () => {
        // ACTIONS
        result = await ethergram.uploadImage(hash, description,  {from: author});
        imageCount = await ethergram.imageCount()
      })

      it('Create Images', async () => {
        // SUCCESS
        const event = result.logs[0].args // Get Info if Image Struct after calling uploadImage()
        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
        assert.equal(event.hash_string, hash, 'Hash is correct')
        assert.equal(event.description,description, 'Description is correct')
        assert.equal(event.tipAmount,tipAmount, 'Tip Amount is correct')
        assert.equal(event.author, author, 'Author is correct')
        // LOG FOR CONTRACT INFO IN `truffle test`
        console.log(result)
        // FAILURE: Image must have hash
        await ethergram.uploadImage('', description, {from:author}).should.be.rejected;
        // FAILURE: Image must have description
        await ethergram.uploadImage('', '', {from:author}).should.be.rejected;
      })

      it('Lists Images', async () => {
        const image = await ethergram.images(imageCount);
        assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
        assert.equal(image.hash_string, hash, 'Hash is correct')
        assert.equal(image.description,description, 'Description is correct')
        assert.equal(image.tipAmount,tipAmount, 'Tip Amount is correct')
        assert.equal(image.author, author, 'Author is correct')
      })

      it('allows users to tip images', async () => {
        // Track the author balance before purchase
        let oldAuthorBalance
        oldAuthorBalance = await web3.eth.getBalance(author)
        oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
  
        result = await ethergram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })
  
        // SUCCESS
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
        assert.equal(event.hash_string, hash, 'Hash is correct')
        assert.equal(event.description, 'Image description', 'description is correct')
        assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
        assert.equal(event.author, author, 'author is correct')
  
        // Check that author received funds
        let newAuthorBalance
        newAuthorBalance = await web3.eth.getBalance(author)
        newAuthorBalance = new web3.utils.BN(newAuthorBalance)
  
        let tipImageOwner
        tipImageOwner = web3.utils.toWei('1', 'Ether')
        tipImageOwner = new web3.utils.BN(tipImageOwner)
  
        const expectedBalance = oldAuthorBalance.add(tipImageOwner)
  
        assert.equal(newAuthorBalance.toString(), expectedBalance.toString())
  
        // FAILURE: Tries to tip a image that does not exist
        await ethergram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

      })
    })
    

})
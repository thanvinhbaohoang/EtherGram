import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Ethergram from '../abis/Ethergram.json'
import Navbar from './Navbar'
import Main from './Main'


//Declare IPFS (Public Gateway DEPRECATED !! USE Private Gateway)
const ipfsClient = require('ipfs-http-client')
const projectId = '2FTMzOge17hhTwy3mfVXN4T7L3j';
const projectSecret = '5b69d1a99af9bfe40c6674cae00c74bb';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});


class App extends Component {
  async componentDidMount(){
    await this.loadWeb3();
    await this.loadBlockchainData()
  };

  // Metamask Loading 
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Ethergram.networks[networkId]

    // Check for CONTRACT DEPLOYMENT
    if(networkData) {
      // Get SMART CONTRACT
      const etheregram = new web3.eth.Contract(Ethergram.abi, networkData.address)
      this.setState({ etheregram })

      // Image Displays
      const imagesCount = await etheregram.methods.imageCount().call()
      this.setState({ imagesCount })

      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await etheregram.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('Ethergram contract not deployed to detected network.')
    }
  }


  // FUNCTIONS FOR IMAGE UPLOAD AND IPFS
  captureFile = event => {
    event.preventDefault() // Prevent Page Reload when Submit file
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // CALLING SMART CONTRACT FUNCTION 
      this.state.decentragram.methods.uploadImage(result[0].hash_string, description).send({ from: this.state.account }).on('transactionHash', (hash_string) => {
        this.setState({ loading: false })
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ethergram: null,
      images: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading? 
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
          : <Main 
            captureFile = {this.captureFile}
            uploadImage = {this.uploadImage}
            // Code...
            />
          }
      </div>
    );
  }
}

export default App;
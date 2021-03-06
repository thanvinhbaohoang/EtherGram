import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Ethergram from '../abis/Ethergram.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {
  async componentDidMount(){
    // await this.loadWeb3();
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
    console.log(accounts)
    this.setState({ account: accounts[0] }) // Default to First Wallet Address in Metamask

    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Ethergram.networks[networkId]
    if (networkData) {
      const ethergram = web3.eth.Contract(Ethergram.abi, networkData.address); //Import Ethergram.json and access its abi from folder `abis`
      this.setState({ethergram})
      // const imagesCount = await ethergram.methods.imagesCount().call()
      // this.setState({imagesCount})

      // Change Loading Status
      this.setState({loading: false})
      
    } else {
      window.alert('Ethergram Contract Not Deployed On Network')
    }
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
        { this.state.loading? //
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
          : <Main
            // Code...
            />
          }
      </div>
    );
  }
}

export default App;
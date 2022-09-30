# EtherGram
A simple instagram clone using Web 3.0 Framework and Smart Contracts (Solidity). 

Tutorial (https://www.youtube.com/watch?v=8rhueOcTu8k)
## EtherGram Smart Contract Website
1. Set Up Working Environment
git clone -b starter-pack https.//.....

2. `npm install`

3. Start Server with
`npm run start`

4. Run GANACHE (Fake Blockchain)
$ `ganache`

4. Try Truffle Connections. Migration codes is in /migrations (1_initial_migration.js, 2_deploy_contracts.js)
`truffle migrate --reset`

5. Make Test Programs
../test/test.js

-------------------------------

`npm start`: Start Development Server + Front End

`ganache`: Start test ganache blockchain with preloaded wallets

`truffle test` : to run ./test.js

`truffle migrate`: To deploy contract to Blockchain

We are using web3 library to detect metamask and connect wallet
- Located in App.js `function loadWeb3()`



----------------------------------
# LEARNED CONCEPTS

- Using IPFS for decentralized data storage
- Use web3 library
- Using Ganache for test blockchain RPC
- Learn to write simple Smart Contract using Solidity
- Use Truffle to test smart contract 
- use Truffle to Deploy (Migrate) contract
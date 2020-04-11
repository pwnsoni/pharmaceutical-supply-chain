
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');

const path = require('path');

const configPath = path.join(process.cwd(), './../server/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var userName = config.appAdmin;
var gatewayDiscovery = config.gatewayDiscovery;
var connection_file = config.connection_file;


// connect to the connection file
const ccpPath = path.join(process.cwd(), './../server/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./../server/wallet');



BlockchainClient = {
    async connectToNetwork() {


      const gateway = new Gateway();

      try {

        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Connect to our local fabric
        const network = await gateway.getNetwork('mychannel');
  

        console.log('Connected to mychannel. ');

        // Get the contract we have installed on the peer
        const contract = await network.getContract('chain_code_for_supply_chain');


        let networkObj = {
          contract: contract,
          network: network
        };

        return networkObj;

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
      } finally {
        console.log('Done connecting to network.');
        // gateway.disconnect();
      }

    },

    
    async addParticipant(args) {
      //call addMember smart contract function
      //$TODO: dynamically call submitTransaction
      console.log("initiating addParticipant transaction");
      let response = await args.contract.submitTransaction(args.function, args.participantType, 
        args.licenseNo, args.organisationName, args.address);
      return response;


    },

    async init(contract) {
        await contract.evaluateTransaction('init');
        console.log('init')
    },


    
    async queryAll(contract) {

      console.log("initiating queryAll transaction");
      let response = await contract.evaluateTransaction('queryAll');
      return response;
    },


    async queryByKey(keyPassed) {

      // let str = 'query'
      // let response = await keyPassed.contract.submitTransaction('query', 'arg1', 'arg2');

      let response = await keyPassed.contract.submitTransaction('query', keyPassed.id);
      console.log('query by key response: ')
      console.log(JSON.parse(response.toString()))
      console.log(response.length)
      if (response.length === 2) {
        response = `${keyPassed.id} does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    },

    async queryWithQueryString(contract, queryString){
      
      console.log("initiating queryWithQueryString transaction");
      let response = await contract.submitTransaction('queryWithQueryString', JSON.stringify(queryString));
      return response;
    }
}

module.exports = BlockchainClient;
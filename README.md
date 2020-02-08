Prerequisites:
    
    1--> Use Visual Studio code.

    2--> Use IBM blockchain platform extension.

Steps to Setup:

    1--> Clone this repository

    2--> Run npm install in every directory except /server.

    3--> Add lib directory to the workspace. (this directory contains the chain code) 
    
    4--> Package the smart contract via IBP.

    4--> Install and instantiate the contract via IBP.

    5--> Export the wallet in the /server directory with name wallet.

    6--> Run node initTransaction.js in /pharma-chain directory to test the network if it is running.

    7--> Run npm run dev in pharma-chain directory to run the web app.

Platforms Used:

    1--> Hyperledger fabric 1.4

    2--> npm 6.4.1

    3--> node 8.16.1

    4--> nuxt is used to create the web app.

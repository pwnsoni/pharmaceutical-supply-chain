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

    7--> Run npm run dev in pharma-chain directory to run the web app


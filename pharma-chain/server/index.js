const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const bodyParser = require('body-parser')

const blockchainClient = require('./../blockchainClient');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

  app.get('/api/query', async (req, res) => {
    let networkObject = await blockchainClient.connectToNetwork();
    let response = await blockchainClient.queryAll(networkObject.contract);
    response = response.toString();
    res.send(JSON.parse(response))
  })

  //query By Key

  app.get('/api/queryByKey/:key', async (req, res) => {
    const key = req.params.key;
    let networkObject = await blockchainClient.connectToNetwork();
    let input = {};
    input.contract = networkObject.contract;
    input.id = key;
    let response = await blockchainClient.queryByKey(input);
    res.send(response); 
  })

  //******* this function is done  ***************************/
  app.post('/api/addParticipant', async (req, res) => {
    // json from front end 
    const participant = req.body;
    let networkObject = await blockchainClient.connectToNetwork();

    let args = {
      function: 'addParticipant',
      participantType: participant.participantType,
      licenseNo: participant.licenseNo,
      organisationName: participant.organization,
      address: participant.address,
      contract: networkObject.contract
    };

    let response = await blockchainClient.addParticipant(args);

    //send it to blockchain to add participant
    res.send(response)
  })
//************************************************ */

//addMedicine************************


app.post('/api/addMedicine', async (req, res) => {
  // json from front end 
  const participant = req.body;
  let networkObject = await blockchainClient.connectToNetwork();

  console.log(participant)

  participant.function = 'addMedicine';
  participant.contract = networkObject.contract;

  response = await blockchainClient.addMedicine(participant);
  res.send(response.toString());
})

//************************* */

//query with query string

app.post('/api/search', async (req, res) => {
  // json from front end 
  let selector = {};

  for (let key in req.body) {
    if (!(req.body[key] == null || req.body[key] == '')){
      selector[key] = req.body[key];
    }
  }


  let networkObject = await blockchainClient.connectToNetwork();

  let args = {
    'selector' : selector
  };

  let response = await blockchainClient.queryWithQueryString(networkObject.contract, args);

  //send it to blockchain to add participant
  res.send(response.toString())
})

//GetHistoryForBatchId

app.get('/api/trace/:key', async (req, res) => {
  const key = req.params.key;
  console.log(key);
  let networkObject = await blockchainClient.connectToNetwork();
  let response = await blockchainClient.getHistoryByBatchId(networkObject.contract, key);
  // response = response.toString();
  // console.log("server");
  // console.log(response);
  res.send(response);
})

///////////////////////////////////////////////////

//Ownsership Transfer

app.post('/api/ownershipTransfer', async (req, res) => {
  let input = req.body;
  let networkObject = await blockchainClient.connectToNetwork();
  input.contract = networkObject.contract;
  let response = await blockchainClient.ownershipTransfer(input);
  res.send(response);
})


  // this is for checking connection to invoke init transaction//
  app.get('/initTransaction', async (req, res) => {
    let networkObject = await blockchainClient.connectToNetwork();
    blockchainClient.init(networkObject.contract);
    res.send('init invoked');
  })

  //************************************************** */

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

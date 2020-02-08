'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {


    //function to add participant in blockchain
    //participant can be manufacturer, distributor, wholeseller, retailer
    

    async addParticipant(ctx, participantType, licenseNo, organisationName, address) {
        console.info('addMember invoked');
    
        //create object to hold details of our new member
        let newMember = {};
        let id = licenseNo;

        //***for now assume licese number is primary key for storing info about participant in blockchain**//
        
        newMember.id = id;              //id is the license number
        newMember.licenseNo = licenseNo;
        newMember.participantType = participantType;
        newMember.name = organisationName;
        newMember.address = address;
    
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(newMember)));
        console.info('updated ledger with key: ' + id + 'and value: ');
        console.info(JSON.stringify(newMember));
    
        return newMember;
    
    }

    async queryAll(ctx) {

        let queryString = {
          "selector": {}
        }
    
        let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
        return queryResults;
    
    }

    async query(ctx, key) {
        console.info('query by key ' + key);
        let returnAsBytes = await ctx.stub.getState(key);
        console.info(returnAsBytes)
        if (!returnAsBytes || returnAsBytes.length === 0) {
          return new Error(`${key} does not exist`);
        }
        let result = JSON.parse(returnAsBytes);
        console.info('result of getState: ');
        console.info(result);
        return JSON.stringify(result);
    }

    //helper function for query and queryAll
    async queryWithQueryString(ctx, queryString) {

        console.log("query String");
        console.log(JSON.stringify(queryString));
    
        let resultsIterator = await ctx.stub.getQueryResult(queryString);
    
        let allResults = [];
    
        while (true) {
          let res = await resultsIterator.next();
    
          if (res.value && res.value.value.toString()) {
            let jsonRes = {};
    
            console.log(res.value.value.toString('utf8'));
    
            jsonRes.Key = res.value.key;
    
            try {
              jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
            } catch (err) {
              console.log(err);
              jsonRes.Record = res.value.value.toString('utf8');
            }
    
            allResults.push(jsonRes);
          }
          if (res.done) {
            console.log('end of data');
            await resultsIterator.close();
            console.info(allResults);
            console.log(JSON.stringify(allResults));
            return JSON.stringify(allResults);
        }
      }
    }
    
    

    async init(ctx) {
        console.info('init contract invoked');
    }
}

module.exports = MyContract;
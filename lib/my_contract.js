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

    async addMedicine(ctx, batchId, medicineName, medicineFormula, organization, manLicenseNo, mfgPlace, mfgDate, expDate, owner, currentLocation) {
        console.info('addMedicine invoked');

        //create object to hold details of our new member
        let medicine = {};
        let id = batchId;

        //***for now assume licese number is primary key for storing info about participant in blockchain**//
        medicine.id = id;              //id is the license number
        medicine.batchId = id;
        medicine.manLicenseNo = manLicenseNo;
        medicine.medicineName = medicineName;
        medicine.organization = organization;
        medicine.medicineFormula = medicineFormula;
        medicine.owner = owner;
        medicine.mfgDate = mfgDate;
        medicine.mfgPlace = mfgPlace;
        medicine.expDate = expDate;
        medicine.currentLocation = currentLocation;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(medicine)));
        console.info('updated ledger with key: ' + id + 'and value: ');
        console.info(JSON.stringify(medicine));

        return medicine;

    }

    async testingNetwork(ctx){
        console.log('testing network');
        return('testing network successfull');
    }

    async retrieveHistoryForBatchId(ctx, key) {
        console.info('getting history for key: ' + key);
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        return result;
    }

    async queryAll(ctx) {

        let queryString = {
            selector: {}
        };

        let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
        return queryResults;

    }

    async query(ctx, key) {
        console.info('query by key ' + key);
        let returnAsBytes = await ctx.stub.getState(key);
        console.info(returnAsBytes);
        if (!returnAsBytes || returnAsBytes.length === 0) {
            return new Error(`${key} does not exist`);
        }
        let result = JSON.parse(returnAsBytes);
        console.info('result of getState: ');
        console.info(result);
        return JSON.stringify(result);
    }

    //helper function for  queryAll
    async queryWithQueryString(ctx, queryString) {

        console.log('query String');
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

    //simple function for ownership transfer
    //___________________-------------- Just for checking of ownership transfer

    async ownershipTransfer(ctx, batchId, upcomingOwner){

      // {"selector":{"batchId":"batch1t"}}

      let returnAsBytes = await ctx.stub.getState(batchId);

      let upOwner = await ctx.stub.getState(upcomingOwner);
    
      let upOwnerJson = JSON.parse(upOwner);

      let medicine = JSON.parse(returnAsBytes);

      //validate upcoming owner and save the details of the current transaction as well as time stamp

      medicine.owner = upcomingOwner;
      medicine.currentLocation = upOwnerJson.address;

      //////___________------------         GetHistoryForKey

      await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(medicine)));
      console.info('updated ledger with key: ' + batchId + 'and value: ');
      console.info(JSON.stringify(medicine));

      return medicine;

    }



    async init(ctx) {
        console.info('init contract invoked');
    }
}

module.exports = MyContract;
'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {

    async init(ctx) {
        console.info('init contract invoked');
    }
}

module.exports = MyContract;
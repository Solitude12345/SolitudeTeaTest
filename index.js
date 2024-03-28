const request = require('request');
const fs = require('fs');
const UserAgent = require('user-agents');
const axios = require('axios');

let addressTxt = fs.readFileSync('address.txt');
addressTxt = addressTxt.toString();
let address = addressTxt.split("\r\n");

async function faucet() {
    let index = 0;
    let timer = setInterval(async () => {

        const oneAddr = address[index++];
        if(index >= address.length){
            index = 0;
        }
        const userAgent = new UserAgent();
        request({
            'url': 'https://faucet-api.testnet.tabichain.com/api/faucet',
            'method': "POST",
            'headers': { 'User-Agent': userAgent.toString(), 'Origin': 'https://faucet.testnet.tabichain.com', 'Referer': 'https://faucet.testnet.tabichain.com/' },
            'json': true,
            'body': { address: oneAddr }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        })

    }, 1000)
}
faucet();
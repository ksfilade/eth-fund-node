
var Web3 = require('web3');
var ROPSTEN_WSS = 'wss://ropsten.infura.io/ws';
var provider = new Web3.providers.WebsocketProvider(ROPSTEN_WSS);
var web3 = new Web3(provider);

provider.on('error', e => {
    console.error('WS Infura Error', e);
});

provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider(ROPSTEN_WSS);
    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });
    web3.setProvider(provider);
});
const abi = [{"constant":false,"inputs":[{"name":"fundAddress","type":"address"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":true,"name":"_to","type":"address"}],"name":"Deposit","type":"event"}]
var myContract = new web3.eth.Contract(abi, '0xB665C09C7CD243Cb82049e03B91CA0656D96530f');
// myContract.events.Deposit({
//     // filter: {myIndexedParam: [20,23]},
//     fromBlock: 0,
//     toBlock: 'latest'
// }).on('data', function(event) {
//     console.log(event.returnValues);
// }).on('error', console.error);
module.exports = myContract
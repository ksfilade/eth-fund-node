
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
const abi = [{"constant":false,"inputs":[{"name":"fundAddress","type":"address"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"}]


var myContract = new web3.eth.Contract(abi, '0xfcF511f7b587aF9F1e3A4a485Dea1fC9eA38f346');
myContract.events.Deposit({
    // filter: {myIndexedParam: [20,23]},
    fromBlock: 0,
    toBlock: 'latest'
}).on('data', function(event) {
    console.log(event.returnValues);
}).on('error', console.error);
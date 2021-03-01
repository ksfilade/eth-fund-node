
var Web3 = require('web3');
var ROPSTEN_WSS = 'wss://ropsten.infura.io/ws/v3/97f060b643be49159ce5e62bab0a113f';
var provider = new Web3.providers.WebsocketProvider(ROPSTEN_WSS);
var web3 = new Web3(provider);
var Donation = require('../../models/donations')
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
const abi =  [{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fundAddress","type":"address"},{"name":"fromId","type":"string"},{"name":"toId","type":"string"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"fromId","type":"string"},{"indexed":false,"name":"toId","type":"string"}],"name":"Deposit","type":"event"}]
var myContract = new web3.eth.Contract(abi, '0xDAD225222C3D87d608e86BA73F92b919F57e0ED9');
myContract.events.Deposit({
    fromBlock: 0,
    toBlock: 'latest'
}).on('data', function(event) {
    let donation = new Donation();
    donation.donationFrom = event.returnValues._from
    donation.donationTo = event.returnValues._to
    const BN = web3.utils.BN
    donation.amount = web3.utils.fromWei(new BN( event.returnValues._value ))
    donation.fromId = event.returnValues.fromId
    donation.toId = event.returnValues.toId
    donation.save().then(async () => {
        console.log('successfull saved');
        }).catch((error) => {
        console.log(error);
    })
}).on('error', console.error);
module.exports = myContract
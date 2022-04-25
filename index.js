if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

var account;
web3.eth.requestAccounts().then(
    (accounts) => {
        console.log(accounts[0])
        account = accounts[0]
        document.getElementById('aad').innerHTML = account;
    }
);



const Contract = new web3.eth.Contract(
  contract abi, contract address
);

function supplycheck() {
    Contract.methods.maxsupply.call().call().then(
        (message) => {
            var spot = document.getElementById("res");
            spot.innerHTML = message;
            console.log(message)
        }
    )
}
function SetMaxSupply() {
    console.log(document.getElementById("msupply").value);
    Contract.methods.setMaxSupply(document.getElementById("msupply").value).send({ from:account }).then(
        (message) => {
            console.log(message)
        }
    );
}
function mintx() {
    Contract.methods.mint().send({ from:account, value: web3.utils.toBN('50000000000000000') }).then(
        (message) => {
            console.log(message)
        }
    );
}
function Showwallet() {
    Contract.methods.mintedWallets(account).call().then(
        (message) => {
            var spot = document.getElementById("res2");
            spot.innerHTML = message;
            console.log(message)
        }
    )
}

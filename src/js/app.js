// import crypto from 'crypto';
App = {
    web3Provider: null,
    contracts: {},
    accounts_address: '0x0',

    // randomWords: require('../node_modules/random-words'),


    init: async function() {
        console.log("init")


        var key = new Set();
        while (key.size < 20) {
            key.add(this.randomString());
        }
        console.log(key)
        return await App.initWeb3();
    },

    initWeb3: async function() {

        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // If no injected web3 instance is detected, fallback to Ganache.
            App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
        }
        console.log("web3")
        return App.initContract();
    },

    initContract: function() {
        $.getJSON("Candidate_data.json", function(candidate) {
            // console.log(candidate)
            App.contracts.Candidate_data = TruffleContract(candidate);
            App.contracts.Candidate_data.setProvider(App.web3Provider);
            return App.render();
        });
        // return App.bindEvents();
    },

    render: function() {
        var candidateInstance;

        // console.log("account: " + App.accounts_address)
        web3.eth.getCoinbase(function(err, account) {
            if (err == null) {
                App.accounts_address = account;
                // account = App.accounts_address;
                $("#accountAddress").html("Your account: " + account);

                // loader.hide();
                // content.show();
            }
        });
    },

    randomString: function() {
        var result = '';
        var length = 200;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },

    onCandidateLogin: function() {
        // alert("hey");

        if ($('#candidateGender1')[0].checked == true)
        // console.log($('#candidateGender1')[0].value);
            candidateGender = $('#candidateGender1')[0].value;
        else if ($('#candidateGender2')[0].checked == true)
            candidateGender = $('#candidateGender2')[0].value;

        candidateEmail = $('#candidateEmail').val();
        candidateName = $('#candidateName').val();
        candidateReg_no = $('#candidateReg_no').val();
        candidateYear = $('#candidateYear')[0].value;
        candidateBranch = $('#candidateBranch')[0].value;
        candidateEvent = $('#candidateEvent')[0].value;

        console.log(candidateName + ' ' + candidateReg_no + ' ' + candidateBranch + ' ' + candidateYear + ' ' + candidateEmail + ' ' + candidateGender + ' ' + candidateEvent);
        // console.log(this.candidate_user);
        // App.contracts.Candidate_data.deployed().then(function(instance) {
        //     return instance.addCandidate(candidateName, candidateBranch, candidateGender, candidateEmail, candidateYear, candidateReg_no, candidateEvent, { from: App.account, value: 2000, gas: 6721975 });
        // }).then(function(result) {
        //     // Wait for votes to update
        //     console.log('pass');
        // }).catch(function(err) {
        //     console.error(err);
        // });




        // console.log(randomWords());
        // console.log(randomWords({ wordsPerString: 15 }));

        var prime_length = 60;
        var diffHell = crypto.createDiffieHellman(prime_length);

        diffHell.generateKeys('base64');
        console.log("Public Key : ", diffHell.getPublicKey('base64'));
        console.log("Private Key : ", diffHell.getPrivateKey('base64'));

        console.log("Public Key : ", diffHell.getPublicKey('hex'));
        console.log("Private Key : ", diffHell.getPrivateKey('hex'));

    },

    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.handleAdopt);
    },

    // init()

};

App.init();
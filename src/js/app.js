App = {
    web3Provider: null,
    contracts: {},
    accounts_address: '0x0',


    init: async function() {
        console.log("init")
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

    onCandidateLogin: function() {
        // alert("hey");
        candidateEmail = $('#candidateEmail').val();
        candidateName = $('#candidateName').val();
        candidateReg_no = $('#candidateReg_no').val();
        candidateYear = $('#candidateYear').val();
        candidateBranch = $('#candidateBranch').val();

        // console.log(candidateName + ' ' + candidateReg_no + ' ' + candidateBranch + ' ' + candidateYear + ' ' + candidateEmail);
        console.log(this.candidate_user);
        App.contracts.Candidate_data.deployed().then(function(instance) {
            return instance.addCandidate(candidateName, candidateBranch, 'M', candidateEmail, candidateYear, candidateReg_no, { from: App.account, value: 2000, gas: 6721975 });
        }).then(function(result) {
            // Wait for votes to update
            console.log('pass');
        }).catch(function(err) {
            console.error(err);
        });

    },

    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.handleAdopt);
    },

    // init()

};

App.init();
// $(function() {
//     $(window).load(function() {

//     });
// });
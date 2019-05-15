App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        // Load pets.
        return await App.initWeb3();
    },

    initWeb3: async function() {
        /*
         * Replace me...
         */
        // if (typeof web3 !== 'undefined') {
        //     App.web3Provider = web3.currentProvider;
        //     web3 = new Web3(web3.currentProvider);
        // } else {
        //     App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545');
        //     web3 = new Web3(App.web3Provider);
        // }

        // if (typeof web3 !== 'undefined') {
        //     App.web3Provider = web3.currentProvider;
        //     web3 = new Web3(web3.currentProvider);
        // } else {
        //     // If no injected web3 instance is detected, fallback to Ganache CLI.
        //     App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
        //     web3 = new Web3(App.web3Provider);
        // }

        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // If no injected web3 instance is detected, fallback to Ganache.
            App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: function() {
        /*
         * Replace me...
         */
        $.getJSON("Candidate_data.json", function(candidate) {
            App.contracts.Candidate_data = TruffleContract(candidate);
            App.contracts.Candidate_data.setProvider(App.web3Provider);
            return App.render();
        });

        return App.bindEvents();
    },

    render: function() {
        var candidateInstance;
        var loader = $("#loader");
        var content = $("#content");

        loader.show();
        content.hide();

        web3.eth.getCoinbase(function(err, account) {
            if (err == null) {
                App.account = account;
                $("#accountAddress").html("Your account: " + account);
                console.log(account);
                loader.hide();
                content.show();
            }
        });
    },


    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.handleAdopt);
    },

    markAdopted: function(adopters, account) {
        /*
         * Replace me...
         */
    },

    handleAdopt: function(event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));

        /*
         * Replace me...
         */
    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});



// App = {
//     web3Provider: null,
//     contracts: {},
//     account: '0x0',
//     hasVoted: false,

//     init: function() {
//         return App.initWeb3();
//     },

//     initWeb3: function() {
//         // TODO: refactor conditional
//         if (typeof web3 !== 'undefined') {
//             // If a web3 instance is already provided by Meta Mask.
//             App.web3Provider = web3.currentProvider;
//             web3 = new Web3(web3.currentProvider);
//         } else {
//             // Specify default instance if no web3 instance provided
//             App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//             web3 = new Web3(App.web3Provider);
//         }
//         return App.initContract();
//     },

//     initContract: function() {
//         $.getJSON("Candidate_data.json", function(candidate_data) {
//             // Instantiate a new truffle contract from the artifact
//             App.contracts.Candidate_data = TruffleContract(candidate_data);
//             // Connect provider to interact with contract
//             App.contracts.Candidate_data.setProvider(App.web3Provider);

//             App.listenForEvents();

//             return App.render();
//         });
//     },

//     // Listen for events emitted from the contract
//     listenForEvents: function() {
//         App.contracts.Candidate_data.deployed().then(function(instance) {
//             // Restart Chrome if you are unable to receive this event
//             // This is a known issue with Metamask
//             // https://github.com/MetaMask/metamask-extension/issues/2393
//             instance.votedEvent({}, {
//                 fromBlock: 0,
//                 toBlock: 'latest'
//             }).watch(function(error, event) {
//                 console.log("event triggered", event)
//                     // Reload when a new vote is recorded
//                 App.render();
//             });
//         });
//     },

//     render: function() {
//         var electionInstance;
//         var loader = $("#loader");
//         var content = $("#content");

//         loader.show();
//         content.hide();

//         // Load account data
//         web3.eth.getCoinbase(function(err, account) {
//             if (err === null) {
//                 App.account = account;
//                 $("#accountAddress").html("Your Account: " + account);
//             }
//         });

//         // Load contract data
//         App.contracts.Candidate_data.deployed().then(function(instance) {
//             electionInstance = instance;
//             return electionInstance.candidatesCount();
//         }).then(function(candidatesCount) {
//             var candidatesResults = $("#candidatesResults");
//             candidatesResults.empty();

//             var candidatesSelect = $('#candidatesSelect');
//             candidatesSelect.empty();

//             for (var i = 1; i <= candidatesCount; i++) {
//                 electionInstance.candidates(i).then(function(candidate) {
//                     var id = candidate[0];
//                     var name = candidate[1];
//                     var voteCount = candidate[2];

//                     // Render candidate Result
//                     var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
//                     candidatesResults.append(candidateTemplate);

//                     // Render candidate ballot option
//                     var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
//                     candidatesSelect.append(candidateOption);
//                 });
//             }
//             return electionInstance.voters(App.account);
//         }).then(function(hasVoted) {
//             // Do not allow a user to vote
//             if (hasVoted) {
//                 $('form').hide();
//             }
//             loader.hide();
//             content.show();
//         }).catch(function(error) {
//             console.warn(error);
//         });
//     },

//     castVote: function() {
//         var candidateId = $('#candidatesSelect').val();
//         App.contracts.Candidate_data.deployed().then(function(instance) {
//             return instance.vote(candidateId, { from: App.account });
//         }).then(function(result) {
//             // Wait for votes to update
//             $("#content").hide();
//             $("#loader").show();
//         }).catch(function(err) {
//             console.error(err);
//         });
//     }
// };

// $(function() {
//     $(window).load(function() {
//         App.init();
//     });
// });
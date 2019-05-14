pragma solidity >=0.4.9 <0.6.0;

contract Voters_data {
    struct Voter {
        uint id;
        string votersname;
        uint election_id;
        uint age;
        string gender;
        string password;
        string voters_address;
        string adhar_number;
    }

    mapping (uint =>Voter) public Voters;

    uint public voter_count;

    function addVoter(string memory _name,uint _age,string memory _gender,string memory _address,string memory _password,uint _electionid,string memory _adhar) public{
        voter_count++;
        Voters[voter_count] = Voter(voter_count,_name, _electionid, _age, _gender, _password, _address, _adhar);
    }

    constructor () public {
        addVoter("vishwa",45, "M", "address", "password", 101, "qwertyuiop");
    }
}
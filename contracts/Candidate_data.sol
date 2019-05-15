pragma solidity >=0.4.9 <0.6.0;
contract Candidate_data{

    struct Candidate {
        uint Id;
        string candidatename;
        uint age;
        string gender;
        string Address;
        string email_id;
        uint govt_proof_id;
        uint vote_count;
    }

    struct Election_candidate {
        string election_city;
        string election_state;
        string election_party;
    }

    mapping (uint =>Candidate) public Candidates;
    mapping (uint =>Election_candidate) public Election_candidates;

    uint public Candidate_count;

    function addCandidate(string memory _cand,uint _age,
    string memory _gender,string memory _address,string memory _email, uint _proofid,string memory _elect_city,string memory _elect_state,string memory _elect_party) public{

        Candidates[Candidate_count] = Candidate(Candidate_count,_cand,
        _age,_gender,_address,_email,_proofid,0);
        Election_candidates[Candidate_count] = Election_candidate(_elect_city,
        _elect_state,_elect_party);
        Candidate_count ++;

        // election_objects[Candidate_count] = election_objects(_cand);
    }

    function addVote(uint fetch_id) public{
      Candidates[fetch_id].vote_count ++;
    }

    constructor () public{
    //addCandidate("Aman");
    //addCandidate("Vishal");
    addCandidate("demo", 20, "M", "address", "email", 10,"sangola", "maha", "bjp");
    addCandidate("Vishwa", 20, "M", "address", "email", 10,"sangola", "maha", "bjp");
    }
    /*function addVote(uint _id) public{
        Candidate memory c =Candidates[_id];
        count_of_vote=c.vote_count;
        count_of_vote =count_of_vote+1;
        c.vote_count=count_of_vote;
    }*/
}
pragma solidity >=0.4.9 < 0.6.0;
contract Candidate_data{

    struct Candidate {
        uint Id;
        string candidatename;
        string branch;
        string gender;
        string year;
        string email_id;
        string reg_id;
        uint vote_count;
    }

    struct users{
        uint voters_ID;
        string votername;
        string Regno;
        string Branch;
        string Year;
        string Emailid;
    }

    struct users_rem{
        uint voters_ID;
        bool has_voted;
        string key;
    }

    struct Candidate_event{
        uint Id;
        string candidate_event;
    }

    mapping (uint => users) public Users;
    mapping (uint =>users_rem) public Users_rem;

    mapping(address => bool) public voters;

    mapping (uint =>Candidate) public Candidates;

    mapping (uint =>Candidate_event) public candidate_event;

    uint public Candidate_count;
    uint public voters_count ;
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate(string memory _cand, string memory _branch, string memory _gender,
     string memory _email,  string memory _year, string memory _reg_id, string memory _event) public payable {
        Candidates[Candidate_count] = Candidate(Candidate_count,_cand, _branch, _gender, _email, _year, _reg_id, 0);
        candidate_event[Candidate_count] = Candidate_event(Candidate_count, _event);
        Candidate_count ++;
    }
    // function addCandidateOther() {
    // }

    function addVoter(bool _hasvoted,string memory _votername, string memory _regno, string memory _voterbranch,
    string memory _voteryear,string memory _emailid, string memory _pubkey) public payable{
		Users[voters_count] = users(voters_count,_votername,_regno,_voterbranch,_voteryear,_emailid);
        Users_rem[voters_count] = users_rem(voters_count, _hasvoted,_pubkey);
		voters_count++;
	}

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender],"check voting done?");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= Candidate_count, "validate candidate_id");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        Candidates[_candidateId].vote_count++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
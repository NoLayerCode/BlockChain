pragma solidity >=0.4.9 <0.6.0;
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

    struct Candidate_event{
        uint Id;
        string candidate_event;
    }

    mapping(address => bool) public voters;

    mapping (uint =>Candidate) public Candidates;

    mapping (uint =>Candidate_event) public candidate_event;

    uint public Candidate_count;
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate(string memory _cand, string memory _branch, string memory _gender,
     string memory _email,  string memory _year, string memory _reg_id, string memory _event) payable public{
        Candidates[Candidate_count] = Candidate(Candidate_count,_cand, _branch, _gender, _email, _year, _reg_id, 0);
        candidate_event[Candidate_count] = Candidate_event(Candidate_count, _event);
        Candidate_count ++;
    }
    // function addCandidateOther() {
        
    // }

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

    // constructor () public{
    //addCandidate("Aman");
    //addCandidate("Vishal");
    // addCandidate("demo", 20, "M", "address", "email", 10,"sangola", "maha", "bjp");
    // addCandidate("Vishwa", 20, "M", "address", "email", 10,"sangola", "maha", "bjp");
    // }
    // function addVote(uint _id) public{
    //     Candidate memory c =Candidates[_id];
    //     count_of_vote=c.vote_count;
    //     count_of_vote =count_of_vote+1;
    //     c.vote_count=count_of_vote;
    // }
}
pragma solidity >=0.4.9 < 0.6.0;
contract Candidate_data{

 //Modified
    struct Admin{
        string username;
        string password;
    }

    mapping (uint => Admin) public admin;
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
        string password;
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

    //Modified
    mapping (address => users) public users_list;
    mapping (address => users_rem) public users_rem_list;
    mapping (address => Candidate) public Candidate_list;
    mapping (address=>Candidate_event) public Candidate_event_list;

    mapping (uint => users) public Users;
    mapping (uint =>users_rem) public Users_rem;

    mapping(address => bool) public voters;

    mapping (uint =>Candidate) public Candidates;

    mapping (uint =>Candidate_event) public candidate_event;

    uint public Candidate_count;
    uint public voters_count;
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate(string memory _cand, string memory _branch, string memory _gender,
     string memory _email,  string memory _year, string memory _reg_id, string memory _event) public payable {
        Candidates[Candidate_count] = Candidate(Candidate_count,_cand, _branch, _gender, _email, _year, _reg_id, 0);
        candidate_event[Candidate_count] = Candidate_event(Candidate_count, _event);
        Candidate_count ++;
    }
    function addVoter(bool _hasvoted,string memory _votername, string memory _regno, string memory _voterbranch,
    string memory _voteryear,string memory _emailid, string memory _pubkey,string memory _pass) public payable{
		Users[voters_count] = users(voters_count,_votername,_regno,_voterbranch,_voteryear,_emailid,_pass);
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

    // function showCandidate() public payable returns(string memory name, string memory reg_no, string memory voting_event) {
    //     for(uint i = 0; i <= voters_count; i++){
    //         if((keccak256(abi.encodePacked(mailid)) == keccak256(abi.encodePacked(_username))
    //         ) && (keccak256(abi.encodePacked(word)) == keccak256(abi.encodePacked(_keyword)))){
    //             //console.log("Login successful");
    //             return 1;
    //         }
    //         else{
    //             bool flag = false;
    //             for(uint i = 0; i <= voters_count; i++){
    //                 mailid = Users[i].Emailid;
    //                 word = Users[i].password;
    //                 if((keccak256(abi.encodePacked(mailid)) == keccak256(abi.encodePacked(_username))) && (keccak256(abi.encodePacked(word)) == keccak256(abi.encodePacked(_keyword)))){
    //                     //console.log("Login successful");
    //                     flag = true;
    //                 }
    //             }
    //             if(flag == true){
    //                 return 11;
    //             }
    //             else{
    //                 return 0;
    //             }
    //         }
    //     }
    // }


    function adminLogin(string memory _username,string memory _keyword) public payable returns (uint) {
        string memory mailid;
        string memory word;
        // for(uint i = 0; i <= voters_count; i++){
            mailid = "g@g.com";
            word = "gopi";
            if((keccak256(abi.encodePacked(mailid)) == keccak256(abi.encodePacked(_username))
            ) && (keccak256(abi.encodePacked(word)) == keccak256(abi.encodePacked(_keyword)))){
                //console.log("Login successful");
                return 1;
            }
            else{
                bool flag = false;
                for(uint j = 0; j <= voters_count; j++){
                    mailid = Users[j].Emailid;
                    word = Users[j].password;
                    if((keccak256(abi.encodePacked(mailid)) == keccak256(abi.encodePacked(_username))) && (keccak256(abi.encodePacked(word)) == keccak256(abi.encodePacked(_keyword)))){
                        //console.log("Login successful");
                        flag = true;
                    }
                }
                if(flag == true){
                    return 11;
                }
                else{
                    return 0;
                }
            }
        // }
    }
}
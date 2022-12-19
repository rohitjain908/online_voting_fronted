import { Component } from "react";
import Header from "./header";
import { ballotPosition, isVoted, submitBallot, voterBallot } from '../../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Card,CardTitle,Col,Label,Modal,ModalBody,ModalHeader,Row,Form,FormGroup,Input } from 'reactstrap';


class DashBoard extends Component {

    constructor(props){
        super(props);

        this.state = {
            ballotData : {},
            votes : {},
            voted : false,
            voterBallot : {},
            open : false,
            selectingVotes:{}

        }
    }

    componentDidMount(){
        this.getData();
    }

    

    getData = async () => {
        let body = {
            "adminUniversity" : "IIT BHU"
        }
        await ballotPosition(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comes in ballot position")
                data = data['data']
                console.log(data)
                const votesEle= {};
                for(let position in data){
                        let candidates = data[position];
                        const selectingVotes={};
                        candidates.map((candidate) => {
                            selectingVotes[candidate['name']] = {selected : false};
                        
                        })
                        votesEle[position] = selectingVotes;  
                }
                console.log(votesEle)
                this.setState({
                    ballotData : data,
                    selectingVotes: votesEle
                })
            }

        })

        let votes = {
            "Vice presidant" : "Rahul",
            "Mess Secretary" : "Atul",
            "Finance Minister" : "yash",
            "Prime Minister (PM)" : "anchaliya",
            "Hostel Secretary" : "Animesh"

        }

        this.setState({
            votes : votes
        })

        let voterId =  localStorage.getItem("userId");
        let obj = {
            "voterId" : voterId
        }

        isVoted(obj).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                let voted = data['voted']
                this.setState({
                    voted : voted
                })
                if(voted){

                    voterBallot(obj).then(res => {
                        data = res['data']
                        if(data['message'] == 'success'){
                            let ballot = data['ballot']
                            console.log("ballot ",ballot)
                            let voterBallot = {}
                            for(let key in this.state.ballotData){
                                if(key in ballot){
                                    voterBallot[key] = ballot[key]
                                }
                                else{
                                    voterBallot[key] = "NA"
                                }
                            }
                            console.log("voterBallot ", voterBallot)
                            this.setState({
                                voterBallot : voterBallot
                            })
                        }
                    
                    })

                    return
                }
                console.log("Voted ", data['voted'])
            }
        })

        console.log("user Id ", localStorage.getItem("userId"))
    }


    viewBallot = (event) => {
        console.log("comes in viewBallot")
        event.preventDefault();
        this.setState({
            open : true
        })
    }

    toggleOpen = () => {
        this.setState({
            open : !this.state.open
        })
    }
    handleSelectVotes=(e)=>{
        const votes= this.state.selectingVotes;
        console.log(votes)
        const arr = e.target.name.split('#');
        for(const el in votes[arr[0]]){
            votes[arr[0]][el].selected=false;
        }
        votes[arr[0]][arr[1]].selected=true;
        console.log(votes)
        this.setState({selectingVotes:votes})
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        console.log("comes in submit")
        let votes = {}
        let selectedVotes = this.state.selectingVotes
        for(let position in selectedVotes){
            let choosedCandidate = "NA";
            for(let candidate in selectedVotes[position]){
                if(selectedVotes[position][candidate].selected){
                    choosedCandidate = candidate
                    break
                }
            }
            if(choosedCandidate != "NA"){
                votes[position] = choosedCandidate
            }
        }

        let body = {
            "votes" : votes,
            "voterId" : localStorage.getItem("userId")
        }

        submitBallot(body).then(res => {
            console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                alert("Your votes has been submited")
                this.getData();
            }

        })
    }

    render(){
        let data = this.state.ballotData;

        let cards = [];
        for(let position in data){
                let candidates = data[position];
                const cardBody = candidates.map((candidate) => {
                    return(
                        <div class = "row" style = {{padding : '10px'}}>
                            <div class = "col">
                            <input type = "checkbox"
                            name={position+'#'+candidate['name']} 
                            onChange={e=>this.handleSelectVotes(e)} 
                            checked={this.state.selectingVotes[position][candidate['name']]?.selected}>
                            </input></div>
                            <div class = "col">{candidate['name']}</div>
                            <div class = "col">{candidate['bio']}</div>
                        </div>
                        
                    )
                })
                cards.push(
                    <div class = "card" style = {{width : '80%', border : '6px', backgroundColor : 'lightsalmon'}}>
                        <div class="card-body">
                            <h5 class="card-title">{position}</h5>
                            <hr/>
                            {cardBody}
                            
                        </div>

                    </div>
                )
            
                
        }
        let tableBody = [];
        let count = 1;
        for(let position in this.state.voterBallot){

            tableBody.push(
                <tr>
                    <th scope="row">{count}</th>
                    <td>{position}</td>
                    <td>{this.state.voterBallot[position]}</td>
                    
                </tr>
            )

            count = count + 1

        }

       

        if(this.state.voted){
            return(
                <>
                    <Header/>
                    <div style={{marginTop : '100px' , marginLeft:'auto',marginRight:'auto',display : 'flex', flexDirection:'column',justifyContent : 'center',textAlign : 'center' ,gap:'20px'}}>
                            <h8>You have already voted for this elelction!</h8>
                            <button class = "btn btn-warning" style = {{width : '30%', marginLeft:'auto', marginRight:'auto'}} onClick={this.viewBallot}><i class="fa fa-eye" aria-hidden="true"></i>  View Your Ballot</button>
                    </div>

                    <Modal isOpen={this.state.open} toggle={this.toggleOpen}>
                    <ModalHeader toggle={this.toggleOpen}>Your Voted candidates</ModalHeader>
                    <ModalBody>
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Position</th>
                                <th scope="col">Candidate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                    </ModalBody>
                </Modal>
                </>
            )
        }

       console.log(cards)
        return(
            <>
                <div>
                    <Header/>
                    
                    <div style={{marginTop : '100px' , marginLeft:'auto',marginRight:'auto',display : 'flex', flexDirection:'column',justifyContent : 'center',textAlign : 'center' ,gap:'20px'}}>
                        <p>You can select upto 1 candidate from each position</p>
                        {/* <div  style = {{marginLeft:'auto',display : 'flex', justifyContent : 'center', textAlign : 'center' ,flexDirection:'column',gap:'20px'}}>
                                {cards}
                        </div> */}
                    </div>
                        <div  style = {{display : 'flex', justifyContent : 'center',textAlign : 'center'}}>
                            <div class = "container" style = {{display : 'flex', justifyContent : 'center', textAlign : 'center' ,flexDirection:'column',gap:'20px'}}>
                                {cards}
                            </div>
                        </div>
                        <div style = {{display : 'flex', justifyContent : 'center',textAlign : 'center', padding : '10px'}}>
                            <button class = "btn btn-success" onClick={this.handleSubmit}>Submit</button>
                        </div>
                        
                    
                </div>
            </>
        )
    }
}


export default DashBoard
import { Component } from 'react';
import { ballotPosition } from '../../../api';
import Sidebar from "./sidebar";


class BallotPosition extends Component{

    constructor(props){
        super(props);

        this.state = {
            ballotData : {}

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
                this.setState({
                    ballotData : data
                })
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
                            <div class = "col">{candidate['name']}</div>
                            <div class = "col">{candidate['bio']}</div>
                            <div class = "col">{candidate['votes']} votes</div>
                        </div>
                        
                    )
                })
                
                cards.push(
                    <div class = "card" style = {{width : '50%', margin:'auto', border : '6px', backgroundColor : 'lightsalmon'}}>
                        <div class="card-body">
                            <h5 class="card-title">{position}</h5>
                            {cardBody}
                        </div>

                    </div>
                )
            
                
        }

       console.log(cards)


        return(
            <>
                <Sidebar/>
                <main style={{marginTop : '56px', marginBottom : '10px'}}>
                    
                    
                        <div class="container pt-4">
                            <div style = {{padding: '5px', fontSize: '25px'}}>
                                Ballot Position
                            </div>
                        </div>


                        <div  style = {{display : 'flex', justifyContent : 'center',textAlign : 'center'}}>
                            <div class = "container" style = {{display : 'flex', justifyContent : 'center', textAlign : 'center' ,flexDirection:'column',gap:'20px'}}>
                                {cards}
                            </div>
                        
                    </div>
                </main>
            </>
        )
    }

}

export default BallotPosition
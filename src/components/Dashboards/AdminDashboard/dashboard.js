import { Component } from "react";
import Sidebar from "./sidebar";
import BarChart from 'react-bar-chart';
import './sidebar.css';


class Dashboard extends Component{

   

    render(){

        const data = [
            {text: 'Man', value: 50}, 
            {text: 'Woman', value: 30} 
          ];
           
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        return(
            <>
                <Sidebar/>
                <main style={{marginTop : '56px'}}>
                    <div class="container pt-4">
                        <div style = {{padding: '5px', fontSize: '25px'}}>
                            DashBoard
                        </div>
                        <section>
                            <div class="row">
                                <div class="col-xl-3 col-sm-6 col-12 mb-4" >
                                <div class="card" style = {{backgroundColor: 'lightgrey'}}>
                                    <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                        <i class="fas fa-pencil-alt text-info fa-3x"></i>
                                        </div>
                                        <div class="text-end">
                                        <h3>4</h3>
                                        <p class="mb-0">No. of Positions</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12 mb-4">
                                <div class="card"  style =  {{backgroundColor: 'lightgrey'}}>
                                    <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                        <i class="far fa-user text-warning fa-3x"></i>
                                        </div>
                                        <div class="text-end">
                                        <h3>12</h3>
                                        <p class="mb-0">No. of Candidates</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12 mb-4">
                                <div class="card"   style = {{backgroundColor: 'lightgrey'}}>
                                    <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                        <i class="fa-solid fa-users text-danger fa-3x"></i>
                                        </div>
                                        <div class="text-end">
                                        <h3>22</h3>
                                        <p class="mb-0">Total Voters</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-xl-3 col-sm-6 col-12 mb-4">
                                <div class="card"   style = {{backgroundColor: 'lightgrey'}}>
                                    <div class="card-body">
                                    <div class="d-flex justify-content-between px-md-1">
                                        <div class="align-self-center">
                                        <i class="fas fa-vote-yea text-success fa-3x"></i>
                                        </div>
                                        <div class="text-end">
                                        <h3>22</h3>
                                        <p class="mb-0">Voters Voted</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section>
   
                        <section>
                            <div style={{width: '50%'}}> 
                                <BarChart ylabel='Quantity'
                                width={500}
                                height={500}
                                margin={margin}
                                data={data}
                                />
                            </div>
                        </section>
                    </div>
                </main>
            </>
        )
    }
}

export default Dashboard;
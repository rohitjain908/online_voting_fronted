import { Component } from 'react';
import { addCandidate, candidatesList, positionsList, getCandidate, editCandidate, deleteCandidate } from '../../../api';
import Sidebar from "./sidebar";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import filterFactory, {textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Button,Card,CardTitle,Col,Label,Modal,ModalBody,ModalHeader,Row,Form,FormGroup,Input } from 'reactstrap';

class Candidates extends Component{

    constructor(props){
        super(props);

        this.state = {
            adminUniversity : '',
            candidatesList : '',
            add : false,
            edit : false,
            fullName : '',
            bio : '',
            positions : [],
            position : '',
            positionId : -1,
            error : '',
            candidateId : ''
        }
    }

    handleDelete = (event, candidateId) => {
        event.preventDefault();
        // alert("delete", candidateId)
        //console.log("candidate Id ", candidateId)

        let body = {
            "candidateId" : candidateId
        }

        deleteCandidate(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comes in delete candidate")
                this.getdata()
                alert("deleted")
            }
        })




    }

    handleEdit = (event, candidateId) => {
        event.preventDefault();
        //alert("edit", candidateId)
        this.setState({
            edit : true
        })

        let body = {
            "candidateId" : candidateId
        }

        getCandidate(body).then(res => {
            console.log(res);
            let data = res['data'];
            if(data['message'] == 'success'){
                console.log("comes")
                data = data['data']
                let fullName = data['fullName']
                let bio = data['bio']
                let position = data['position']
                let positionId = data['positionId']

                this.setState({
                    fullName : fullName,
                    bio : bio,
                    position : '',
                    positionId : -1,
                    candidateId : candidateId
                })
            }
        })


    }

    onChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }


    handleAdd = (event) => {
        event.preventDefault();
        //alert("add")

        this.setState({
            add : true,
            fullName : '',
            bio : '',
            position : '',
            positionId : -1
        })

    }

    toggleAdd = (event) => {
        event.preventDefault();
        this.setState({
            add : !this.state.add
        })
    }

    toggleEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit : !this.state.edit
        })
    }


    handleCreate = (event) => {
        event.preventDefault();
        if(this.state.positionId == -1){
            this.setState({
                error : "Please Select a valid Position"
            })
            return;
        }

        this.setState({
            error : ''
        })

        let body = {
            "fullName" : this.state.fullName,
            "bio" : this.state.bio,
            "university" : this.state.adminUniversity,
            "positionId" : this.state.positionId
        }

        addCandidate(body).then(res => {
            //console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                //console.log("comess")
                alert("Added")
                this.getdata()
                this.setState({
                    add : false
                })
            }
            else{
                this.setState({
                    error : data['error']
                })
            }
        })



        

    }

    handleUpdate = (event) => {
        event.preventDefault();
        if(this.state.positionId == -1){
            this.setState({
                error : "Please Select a valid Position"
            })
            return;
        }

        this.setState({
            error : ''
        })

        let body = {
            "candidateId" : this.state.candidateId,
            "fullName" : this.state.fullName,
            "bio" : this.state.bio,
            "university" : this.state.adminUniversity,
            "positionId" : this.state.positionId
        }

        editCandidate(body).then(res => {
            //console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                //console.log("comess")
                alert("Update")
                this.getdata()
                this.setState({
                    edit : false
                })
            }
            else{
                this.setState({
                    error : data['error']
                })
            }
        })





    }

    handlePositionChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        console.log(event.target)
        this.setState({
            positionId : event.target.value,
            position : event.target.value
        })

    }


    componentDidMount(){
        this.getdata()
    }

    
    getdata = () => {
        const body = {
            adminUniversity : 'IIT BHU'
        }

        this.setState({
            adminUniversity : 'IIT BHU'
        })

        candidatesList(body).then(res => {
            let data = res['data']
            if(data['message'] == 'success'){
                let List = data['candidatesList']
                let result = []
                List.map((obj) => {
                    result.push(
                        {
                            fullName : obj['fullName'],
                            position : obj['position'],
                            bio : obj['bio'],
                            action :
                                    <span>
                                        <button class = "btn btn-primary" onClick = {(event) => this.handleEdit(event, obj['id'])}><i class="fas fa-edit"></i></button>
                                        <button class = "btn btn-danger"  onClick = {(event) => this.handleDelete(event, obj['id'])} style = {{marginLeft : '10px'}}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </span>
                        }
                    )
                })

                this.setState({
                    candidatesList : result
                })
            }
        })

        
        positionsList(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                //console.log("comes")
                this.setState({
                    positions : data['postionsList']
                })


            }
        })

        
        





       
    }


    render(){

        const columns = [
            {
                dataField: "fullName",
                text: "Full Name",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "position",
                text: "Position",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "bio",
                text: "Bio",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "action",
                text: "Action"
            }
        ];
        return(
            <>
                <Sidebar/>
                <main style={{marginTop : '56px'}}>
                    <div class="container pt-4">
                        <div style = {{padding: '5px', fontSize: '25px'}}>
                            Candidates
                        </div>
                        <button class = "btn btn-success"  style = {{padding: '10px', margin : '10px'}}
                        onClick = {this.handleAdd}><i class="fa fa-plus" aria-hidden="true"></i>         Add New</button>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={this.state.candidatesList}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                            filter = {filterFactory()}
                            filterPosition="top"
                        />
                        
                    </div>
                </main>



                <Modal isOpen={this.state.add} toggle={this.toggleAdd}>
                    <ModalHeader toggle={this.toggleAdd}>Add Candidate</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="fullName"  ><strong>Full Name</strong></label>
                            <input type="text" class="form-control" id="fullName" name = "fullName" value = {this.state.fullName}  onChange = {this.onChangeInput} placeholder="Full Name"/>
                        </div>
                        <div class="form-group">
                            <label for="bio"><strong>Bio</strong></label>
                            <input type="text" class="form-control" name = "bio" value = {this.state.bio}  onChange = {this.onChangeInput} id="bio" placeholder="Bio"/>
                        </div>
                        <div class="form-group">
                            <label for="position"><strong>Position</strong></label>
                            <br/>
                            <select class="form-control" value={this.state.position} onChange={this.handlePositionChange} id = "position">
                                <option value="-1">---------</option>
                                {this.state.positions.map((position) => 
                                <option value={position.id}>{position.name}</option>
                                )}
                          </select>
                        </div>
                        <span>
                            <button class="btn btn-danger" onClick = {this.toggleAdd}>Close</button>
                            <button class="btn btn-success" onClick = {this.handleCreate} style = {{marginLeft : '290px'}}>Add</button>
                        </span>
                        
                        </form>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleEdit}>Edit Candidate</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="fullName"  ><strong>Full Name</strong></label>
                            <input type="text" class="form-control" id="fullName" name = "fullName" value = {this.state.fullName}  onChange = {this.onChangeInput} placeholder="Full Name"/>
                        </div>
                        <div class="form-group">
                            <label for="bio"><strong>Bio</strong></label>
                            <input type="text" class="form-control" name = "bio" value = {this.state.bio}  onChange = {this.onChangeInput} id="bio" placeholder="Bio"/>
                        </div>
                        <div class="form-group">
                            <label for="position"><strong>Position</strong></label>
                            <br/>
                            <select class="form-control" value={this.state.position} onChange={this.handlePositionChange} id = "position">
                                <option value="-1">---------</option>
                                {this.state.positions.map((position) => 
                                <option value={position.id}>{position.name}</option>
                                )}
                          </select>
                        </div>
                        <span>
                            <button class="btn btn-danger" onClick = {this.toggleEdit}>Close</button>
                            <button class="btn btn-success" onClick = {this.handleUpdate} style = {{marginLeft : '290px'}}>Update</button>
                        </span>
                        
                        </form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Candidates
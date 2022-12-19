import { Component } from 'react';
import { addPosition, deletePosition, editPosition, getPosition, positionsList } from '../../../api';
import Sidebar from "./sidebar";


import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Button,Card,CardTitle,Col,Label,Modal,ModalBody,ModalHeader,Row,Form,FormGroup,Input } from 'reactstrap';

class Position extends Component{

    constructor(props){
        super(props);

        this.state = {
            positionsList : [],
            add : false,
            edit : false,
            name : '',
            maxCandidates : '',
            adminUniversity : '',
            positionId : ''
        }
    }

    componentDidMount(){
        this.getData()
    }

    onChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    handleDelete = (event, positionId) => {

        event.preventDefault();
        
        let body = {
            "positionId" : positionId
        }

        deletePosition(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comes in delete position")
                this.getData()
                alert("deleted")
            }
        })
    }

    handleEdit = (event, positionId) => {
        event.preventDefault();
        //alert("edit")

        event.preventDefault();
        //alert("edit", candidateId)
        this.setState({
            edit : true,
            positionId : positionId
        })

        let body = {
            "positionId" : positionId
        }


        getPosition(body).then(res => {
            console.log(res);
            let data = res['data'];
            if(data['message'] == 'success'){
                console.log("comes in get Position")
                let positionDetail = data['positionDetail']
                let name = positionDetail['name']
                let maxCandidates = positionDetail['maxCandidates']
               

                this.setState({
                    name : name ,
                    maxCandidates : maxCandidates
                })
            }
        })
    }

    handleUpdate = (event) => {
        event.preventDefault();
        this.setState({
            error : ''
        })

        let body = {
            "name" : this.state.name,
            "maxCandidates" : this.state.maxCandidates,
            "positionId" : this.state.positionId,
            "university" : this.state.adminUniversity
        }

        editPosition(body).then(res => {
            //console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comess in edit position")
                alert("Update")
                this.getData()
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


    handleAdd = (event) => {
        event.preventDefault();
        //alert("Added")

        this.setState({
            add : true,
            name : '',
            maxCandidates : '',
            error : ''
        })




    }

    handleCreate = (event) => {
        event.preventDefault();
        console.log("inside creates")
        let name = this.state.name;
        let maxCandidates = this.state.maxCandidates;
        let university = this.state.adminUniversity;
        console.log("university ", university)

        let body = {
            "name" : name,
            "maxCandidates" : maxCandidates,
            "university" : university
        }

        addPosition(body).then(res => {
            console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comes in add Position")
                this.getData();
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

    toggleAdd = () => {
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

    getData = () => {
        let body = {
            "adminUniversity" : "IIT BHU"
        }

        this.setState({
            adminUniversity : "IIT BHU"
        })
        positionsList(body).then(res => {
            console.log(res);
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("comes in positionList")
                let positionList = data['postionsList']
                console.log(positionList)
                let result = []
                positionList.map((position) => {
                    result.push({
                        name : position['name'],
                        maxCandidate : position['maxCandidates'],
                        totalVotes : position['totalVotes'],
                        action :
                        <span>
                            <button class = "btn btn-primary" onClick = {(event) => this.handleEdit(event, position['id'])}><i class="fas fa-edit"></i></button>
                            <button class = "btn btn-danger"  onClick = {(event) => this.handleDelete(event, position['id'])} style = {{marginLeft : '10px'}}><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </span>

                    })
                    console.log("fghjk", result)
                })

                console.log("result", result)

                this.setState({
                    positionsList : result
                })
            }
        })
    }


    render(){
        const columns = [
            {
                dataField: "name",
                text: "Name",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "maxCandidate",
                text: "Max Candidate",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "totalVotes",
                text: "Total Votes",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "action",
                text: "Action"
            }
        ];

        console.log(this.state.abc, this.state)
        return(
            <>
                <Sidebar/>
                <main style={{marginTop : '56px', marginBottom : '10px'}}>
                    <div class="container pt-4">
                        <div style = {{padding: '5px', fontSize: '25px'}}>
                            Position
                        </div>
                        <button class = "btn btn-success"  style = {{padding: '10px', margin : '10px'}}
                        onClick = {this.handleAdd}><i class="fa fa-plus" aria-hidden="true"></i>         Add New</button>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={this.state.positionsList}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                            filter = {filterFactory()}
                            filterPosition="top"
                        />
                    </div>                       
                </main>


                <Modal isOpen={this.state.add} toggle={this.toggleAdd}>
                    <ModalHeader toggle={this.toggleAdd}>Add Position</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="name"  ><strong>Name</strong></label>
                            <input type="text" class="form-control" id="name" name = "name" value = {this.state.name}  onChange = {this.onChangeInput} placeholder="Name"/>
                        </div>
                        <div class="form-group">
                            <label for="maxCandidates"><strong>Max Candidates</strong></label>
                            <input type="number" class="form-control" name = "maxCandidates" value = {this.state.maxCandidates}  onChange = {this.onChangeInput} id="bio" placeholder="Max Candidates"/>
                        </div>
                        
                        <span>
                            <button class="btn btn-danger" onClick = {this.toggleAdd}>Close</button>
                            <button class="btn btn-success" onClick = {this.handleCreate} style = {{marginLeft : '290px'}}>Add</button>
                        </span>
                        
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleEdit}>Edit Position</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="name"  ><strong>Name</strong></label>
                            <input type="text" class="form-control" id="name" name = "name" value = {this.state.name}  onChange = {this.onChangeInput} placeholder="Name"/>
                        </div>
                        <div class="form-group">
                            <label for="maxCandidates"><strong>Max Candidates</strong></label>
                            <input type="number" class="form-control" name = "maxCandidates" value = {this.state.maxCandidates}  onChange = {this.onChangeInput} id="bio" placeholder="Max Candidates"/>
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

export default Position;
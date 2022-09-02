import { Component } from "react";
import Sidebar from "./sidebar";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Button,Card,CardTitle,Col,Label,Modal,ModalBody,ModalHeader,Row,Form,FormGroup,Input } from 'reactstrap';
import { voterList, getVoter, editVoter, deleteVoter, registerVoter } from "../../../api";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};


class Voters extends Component{

    constructor(props){
        super(props);

        this.state = {
            edit : false,
            add : false,
            voterList : '',
            fullName : '',
            email : '',
            id : '',
            adminUniversity: '',
            password : '',
            confirmPassword : '',
            error : ''
        }
    }


    

    toggleEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit: !this.state.edit
        })
    }

    toggleAdd = (event) => {
        event.preventDefault();
        this.setState({
            add: !this.state.add
        })
    }


    onChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    handleEdit = (event) => {
        event.preventDefault();
        // id :- event.target.value
        // console.log(event.target.value)
        // alert("edit", event.target.value)

        this.setState({
            error : ''
        })

        

        let voterId = event.target.value;
        console.log("Voter id ", voterId)
        let body = {
            'voterId' : voterId
        }

        this.setState({
            id : voterId
        },  () => {setTimeout(()=>{},100)})

        getVoter(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("Yes")
                let body = data['data']
                let fullName = body['fullName']
                let email = body['email']

                this.setState({
                    fullName : fullName,
                    email : email
                }, () => {setTimeout(()=>{this.setState({edit : true})},1)})



            }
            
        })

        console.log(this.state.fullName)




    }

    handleAdd = (event) => {
        event.preventDefault();
        //alert("add", event.target.value)

        this.setState({
            add : true,
            fullName : '',
            email : '',
            password : '',
            confirmPassword : '',
            error : ''
        })






    }

    handleDelete = (event) =>{
        event.preventDefault();
        //console.log(event.target.value)
        // alert("edit", event.target.value)

        let voterId = event.target.value;
        let body = {
            'voterId' : voterId,
            'adminUniversity' : this.state.adminUniversity
        }

        deleteVoter(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['messgae'] == 'success'){
                this.getdata();
                alert("delete")
            }
        })

    }

    handleUpdate = (event) =>{
        event.preventDefault();
        //console.log(this.state.id)
        let body = {
            "voterId" : this.state.id,
            "fullName" : this.state.fullName,
            "email" : this.state.email
        }

        editVoter(body).then(res => {
            console.log(res)
            let data = res['data']
            if(data['message'] == 'success'){
                console.log("here")
                this.getdata();
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

    handleCreate = (event) =>{
        event.preventDefault();
        let fullName = this.state.fullName;
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let university = this.state.adminUniversity;

        this.setState({
            error : ''
        })

        if(password != confirmPassword){
            this.setState({
                error : "password and confirm password must be same"
            })
            return;
        }

        if(!validateEmail(email)){
            this.setState({
                error : "Plesase enter a valid email"
            })

            return;
        }

        let body = {
            "id" : 1,
            "fullName" : fullName,
            "email" : email,
            "password" : password,
            "university" : university
        }


        registerVoter(body).then(res => {
            console.log(res)
            let data = res['data']
            console.log(data)
            if(data['message'] == 'success'){
                console.log("come here in register voter")
                alert("Added")
                this.setState({
                    add : false
                })
                this.getdata()
            }
            else{
                this.setState({
                    error : data['error']
                })
            }
        })

    }

   

    componentDidMount(){
        this.getdata()
      }


    getdata=()=>{
        const obj = {
            adminUniversity : 'IIT BHU'
        }

        this.setState({
            adminUniversity : 'IIT BHU'
        })
        voterList(obj).then(res =>{
            //console.log(res)
            let data = res['data']
            if(data['messgae'] == 'success'){
                let VoterList = data['voterList'];
                let List = [];
                VoterList.map((obj) =>{
                    List.push(
                        {
                            fullName : obj['fullName'],
                            email : obj['email'],
                            action: 
                                <span>
                                    <button class = "btn btn-primary" value = {obj['id']} onClick = {(event) => this.handleEdit(event)}><i class="fas fa-edit"></i></button>
                                    <button class = "btn btn-danger" value = {obj['id']} onClick = {(event) => this.handleDelete(event)} style = {{marginLeft : '10px'}}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </span>
                        }
                    )
                })
                this.setState({
                    voterList : List
                })
            }
       })
    }


    
    
    render(){

       
        console.log(this.state.voterList)
        
        const columns = [
            {
                dataField: "fullName",
                text: "Full Name",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "email",
                text: "Email",
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
                            Voter List
                        </div>
                        <button class = "btn btn-success"  style = {{padding: '10px', margin : '10px'}}
                        onClick = {this.handleAdd}><i class="fa fa-plus" aria-hidden="true"></i>         Add New</button>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={this.state.voterList}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                            filter = {filterFactory()}
                            filterPosition="top"
                        />
                    </div>
                </main>

                <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleEdit}>Edit Voter</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="fullName"  ><strong>Full Name</strong></label>
                            <input type="text" class="form-control" id="fullName" name = "fullName" value = {this.state.fullName}  onChange = {this.onChangeInput} placeholder="Full Name"/>
                        </div>
                        <div class="form-group">
                            <label for="email"><strong>Email address</strong></label>
                            <input type="email" class="form-control" name = "email" value = {this.state.email}  onChange = {this.onChangeInput} id="email" placeholder="Email"/>
                        </div>
                        <span>
                            <button class="btn btn-danger" onClick = {this.toggleEdit}>Close</button>
                            <button class="btn btn-success" onClick = {this.handleUpdate} style = {{marginLeft : '290px'}}>Update</button>
                        </span>
                        
                        </form>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.add} toggle={this.toggleAdd}>
                    <ModalHeader toggle={this.toggleAdd}>Add Voter</ModalHeader>
                    <ModalBody>
                    <form>
                    {this.state.error && <p class="error">** {this.state.error}</p>}
                        <div class="form-group">
                            <label for="fullName"  ><strong>Full Name</strong></label>
                            <input type="text" class="form-control" id="fullName" name = "fullName" value = {this.state.fullName}  onChange = {this.onChangeInput} placeholder="Full Name"/>
                        </div>
                        <div class="form-group">
                            <label for="email"><strong>Email address</strong></label>
                            <input type="email" class="form-control" name = "email" value = {this.state.email}  onChange = {this.onChangeInput} id="email" placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <label for="password"><strong>Password</strong></label>
                            <input type="password" class="form-control" name = "password" value = {this.state.password}  onChange = {this.onChangeInput} id="password" placeholder="Paswword"/>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword"><strong>Confirm Password</strong></label>
                            <input type="password" class="form-control" name = "confirmPassword" value = {this.state.confirmPassword}  onChange = {this.onChangeInput} id="confirmPassword" placeholder="Confirm Password"/>
                        </div>
                        <span>
                            <button class="btn btn-danger" onClick = {this.toggleAdd}>Close</button>
                            <button class="btn btn-success" onClick = {this.handleCreate} style = {{marginLeft : '290px'}}>Add</button>
                        </span>
                        
                        </form>
                    </ModalBody>
                </Modal>
                
            </>
        )
    }
}

export default Voters;
import { Component } from "react";
import './signUp.css';
import { registerVoter } from '../../api';
import {  Navigate } from 'react-router-dom';

async function registerUser(voterObject) {
   let response;

    try{
        const res = await registerVoter(voterObject);
        let data = res['data'];
            if(data['messgae'] == 'success'){
                let token = data['token']
                localStorage.setItem("token" , token);
                response = {
                    'message': true,
                    'error_message': ''
                }
            }
            else{
                response = {
                    'message': false,
                    'error_message': data['error']
                }
            }
    }catch(err){
        response = {
        }
    }
    return response;
    
}



class RegisterVoter extends Component{

    constructor(props){
        super(props);

        this.state={
            university: '',
            fullName : '',
            email: '',
            password: '',
            confirm_password: '',
            error_message: '',
            user: false
        }

    }


    onChangeInput=(event)=>{
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]:value
          })
    }

    
handleSubmit = async (event)=>{
    event.preventDefault();
    const fullName = this.state.fullName;
    const university = this.state.university;
    const email = this.state.email;
    const password = this.state.password
    const confirm_password = this.state.confirm_password;


    if(password != confirm_password){
        this.setState({
            'error_message': "Password and Confirm Password must be same"
        })
        return;
    }
    else{
        this.setState({
            'error_message': ""
        })

        const voterObject = {
            'id' : 2,
            'fullName' : fullName,
            'university' : university,
            'email' : email,
            'password' : password
        }

        const response = await registerUser(voterObject);
        console.log(response)
        if(response['message'] == true){
            this.setState({
                'user': true
            })
        }
        else{
            this.setState({
                'error_message': response['error_message']
            })
        }
    }
}


   render(){
    return(

        <>
             <div>
                { this.state.user && (<Navigate to="/dashboard"/>) }
            </div>

            <div class="signup-form">	
                <form onSubmit={this.handleSubmit}>
                    <h2>Create Account</h2>
                    {this.state.error_message && <p class="error">** {this.state.error_message}</p>}
                    <p class="lead">It's free and hardly takes more than 30 seconds.</p>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" name="fullName" placeholder="Full Name"
                            required="required" value={this.state.fullName} onChange={this.onChangeInput}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" name="university" placeholder="University Name"
                            required="required" value={this.state.university} onChange={this.onChangeInput}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                            <input type="email" class="form-control" name="email" placeholder="Email Address"
                            required="required" value={this.state.email} onChange={this.onChangeInput}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" name="password" placeholder="Password"
                            required="required" value={this.state.password} onChange={this.onChangeInput}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="fa fa-lock"></i>
                                <i class="fa fa-check"></i>
                            </span>
                            <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password"
                            required="required" value={this.state.confirm_password} onChange={this.onChangeInput}/>
                        </div>
                    </div>        
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block btn-lg">Sign Up</button>
                    </div>
                    <p class="small text-center">By clicking the Sign Up button, you agree to our <br/>
                    <a href="#">Terms &amp; Conditions</a>, and <a href="#">Privacy Policy</a>.</p>
                    <div class="text-center">Already have an account? <a href="/login">Login here</a>.</div>
                </form>
            </div>
        </>

        
    )
   }
}

export default RegisterVoter;
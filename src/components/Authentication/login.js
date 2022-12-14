import { Component } from "react";
import './signUp.css';
import {  Navigate } from 'react-router-dom';
import { login } from '../../api';




class Login extends Component{

    constructor(props){
        super(props);

        this.state={
            email: '',
            password: '',
            confirm_password: '',
            error_message: '',
            user: false
        }

    }

    componentDidMount() {
        document.body.style.background = 'LightYellow'
    }

    onChangeInput=(event)=>{
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]:value
          })
        //setTimeout(()=>{console.log(this.state.name)},1000)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event.target)
        // console.log(event.target.email.value)

        let email = event.target.email.value;
        let password = event.target.password.value


        const object = {
          'email' : email,
          'password' : password
        }

        login(object).then(res =>{
           
            let data = res['data']
            if(data['messgae'] == 'success'){
                this.setState({
                    user : true
                })

                //console.log("Login")

                let token = data['token']
                let userId = data['userId']
                let type = data['type']


                localStorage.setItem(type , token)
                localStorage.setItem("userId" , userId)

                // let to = localStorage.getItem('token')
                // console.log("Localstorage", to)

            }
            else{
                //console.log(data['message'])
                this.setState({
                    error_message : data['error']
                })
            }
          }).catch(errors => console.log(errors)) 			
        


        
    }
   

    render(){
        return(
            <>
                <div>
                    { this.state.user && (<Navigate to="/user-dashboard"/>) }
                </div>

                <div style = {{marginTop : '110px'}}>

                
                
                <div class = "signup-form" >
                    <form onSubmit = {this.handleSubmit}>
                        <h2>Login</h2>
                        {this.state.error_message && <p class="error">** {this.state.error_message}</p>}
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                <input type="text" class="form-control" name="email" placeholder="Email"
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
                            <button type="submit" class="btn btn-primary btn-block btn-lg">Login</button>
                        </div>
                        <div style = {{marginLeft : '35px'}}>
                            Don't Have an account? <a href = "/register-voter">Register</a>
                        </div>
                    </form>

                </div>
                </div>
                

            </>
            
        )
    }
    
}

export default Login;
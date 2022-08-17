import { Component } from "react";
import './signUp.css';

function registerUser(username, email, password) {
    //TODO:have to call register api and if the user registered succesfull then have to render
    //Dashboard page
   return {
    'message': true,
    'error_message': ''
   }
}



class SignUp extends Component{

    constructor(props){
        super(props);

        this.state={
            username: '',
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
        //setTimeout(()=>{console.log(this.state.name)},1000)
        // console.log(name)
        // console.log(value)
        //console.log(this.state.username)

    }

    
handleSubmit=(event)=>{
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password
    const confirm_password = this.state.confirm_password;

    // console.log(username)
    // console.log(email)
    // console.log(password)
    // console.log(confirm_password)

    if(password != confirm_password){
        this.setState({
            'error_message': "Password and Confirm Password must be same"
        })
    }
    else{
        this.setState({
            'error_message': ""
    })



    const response = registerUser(username, email, password);
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
        <div class="signup-form">	
            <form onSubmit={this.handleSubmit}>
                <h2>Create Account</h2>
                {this.state.error_message && <p class="error">** {this.state.error_message}</p>}
                <p class="lead">It's free and hardly takes more than 30 seconds.</p>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                        <input type="text" class="form-control" name="username" placeholder="Username"
                         required="required" value={this.state.username} onChange={this.onChangeInput}/>
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
    )
   }
}

export default SignUp;
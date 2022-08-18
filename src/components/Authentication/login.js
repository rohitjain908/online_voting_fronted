import { Component } from "react";
import './signUp.css';




class Login extends Component{

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
        event.preventDefault()
        // console.log(event.target)
        // console.log(event.target.username)
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
        // console.log("submit")


        const obj = {
          'username' : "animesh",
          'password' : "123456"
        }

       this.setState({
        user : true
       })
    }
   

    render(){
        return(
            <>
                
                <div class = "signup-form">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Login</h2>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" class="form-control" name="username" placeholder="Username"
                                required="required" value={this.state.username} onChange={this.onChangeInput}/>
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
                    </form>

                </div>
                

            </>
            
        )
    }
    
}

export default Login;
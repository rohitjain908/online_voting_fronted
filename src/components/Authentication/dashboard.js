import { Component } from "react";
class  Dashboard extends Component{

    componentDidMount() {
        document.body.style.background = 'white'
    }

    render(){
        return(
            <div id="dashboard-body">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
                        href="#">Mock Interview</a>   
                    </div>
                    <div>
                        <img></img>
                    </div>
                </nav>


                <div class="offcanvas offcanvas-start sidebar-nav bg-dark" tabindex="-1" id="sidebar">
                    <div class="offcanvas-body p-0">
                        <nav class="navbar-dark">
                            <ul class="navbar-nav">
                                <li>
                                    <a href="#" class="nav-link px-3 active">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-3 ">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>Schedule</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-3 ">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>History</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-3 ">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>Blog</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-3 ">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>Materials</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-3 ">
                                        <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                                        <span>Discussion</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
        )
    }

}

export default Dashboard;
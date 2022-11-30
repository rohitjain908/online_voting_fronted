import { Component } from "react";

class Header extends Component{

    render(){
        return(
            <>
                <header>
                <nav
                    id="main-navbar"
                    class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
                    >
                    
                    {/* <!-- Container wrapper --> */}
                    <div class="container-fluid">
                   

                    {/* <!-- Brand --> */}
                    <a class="navbar-brand" href="#" style = {{textAlign : 'center'}}>
                        <strong>Election Portal</strong>
                    </a>
                   
                    {/* <!-- Right links --> */}
                    <ul class="navbar-nav ms-auto d-flex flex-row">
                       

                        <h5 style={{padding : '10px'}}>Rohit Jain</h5>
                        {/* <!-- Avatar --> */}
                        <li class="nav-item dropdown">
                            
                            <a
                                class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false" style = {{fontSize : '100px'}}
                                >
                                <img
                                    src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                                    class="rounded-circle"
                                    height="22"
                                    alt=""
                                    loading="lazy"
                                    />
                            </a>
                            <ul
                                class="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                                >
                                <li><a class="dropdown-item" href="#">My profile</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                    {/* <!-- Container wrapper --> */}
                </nav>
                </header>
            </>
        )
    }
}

export default Header;
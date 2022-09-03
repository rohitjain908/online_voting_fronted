import { Component } from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';

class Sidebar extends Component{

    render(){
        return(
            <>
                <header>
                    <nav
                        id="sidebarMenu"
                        class="collapse d-lg-block sidebar collapse bg-white"
                        >
                        <div class="position-sticky">
                        <div class="list-group list-group-flush mx-3 mt-4">
                            <a
                            href="/adminDashboard"
                            class="list-group-item list-group-item-action py-2 ripple"
                            aria-current="true" 
                            >
                            <i class="fas fa-tachometer-alt fa-fw me-3"></i
                                ><span>Dashboard</span>
                            </a>
                        
                            <a
                            href="/adminDashboard/votes"
                            class="list-group-item list-group-item-action py-2 ripple active"
                            ><i class="fas fa-lock fa-fw me-3"></i><span>Votes</span></a
                            >
                            <a
                            href="/adminDashboard/voters"
                            class="list-group-item list-group-item-action py-2 ripple"
                            ><i class="fa-solid fa-users  fa-fw me-3"></i>
                            <span>Voters</span></a
                            >
                            <a
                            href="#"
                            class="list-group-item list-group-item-action py-2 ripple"
                            >
                            <i class="fas fa-chart-pie fa-fw me-3"></i><span>Positions</span>
                            </a>
                            <a
                            href="/adminDashboard/candidates"
                            class="list-group-item list-group-item-action py-2 ripple"
                            ><i class="far fa-user fa-fw me-3"></i><span>Candidates</span></a
                            >
                            <a
                            href="/adminDashboard/ballotPosition"
                            class="list-group-item list-group-item-action py-2 ripple"
                            ><i class="fas fa-globe fa-fw me-3"></i
                            ><span>Ballot Positions</span></a
                            > 
                        </div>
                    </div>
                </nav>
                {/* <!-- Sidebar --> */}

                {/* <!-- Navbar --> */}
                <nav
                    id="main-navbar"
                    class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
                    >
                    
                    {/* <!-- Container wrapper --> */}
                    <div class="container-fluid">
                    {/* <!-- Toggle button --> */}
                    <button
                            class="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            >
                        <i class="fas fa-bars"></i>
                    </button>

                    {/* <!-- Brand --> */}
                    <a class="navbar-brand" href="#">
                        <img
                            src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                            height="25"
                            alt=""
                            loading="lazy"
                            />
                    </a>
                    {/* <!-- Search form --> */}
                    <form class="d-none d-md-flex input-group w-auto my-auto">
                        <input
                            autocomplete="off"
                            type="search"
                            class="form-control rounded"
                            placeholder='Search (ctrl + "/" to focus)'
                            style={{minWidth : '225px'}}
                            />
                        <span class="input-group-text border-0"
                            ><i class="fas fa-search"></i
                        ></span>
                    </form>

                    {/* <!-- Right links --> */}
                    <ul class="navbar-nav ms-auto d-flex flex-row">
                        {/* <!-- Notification dropdown --> */}
                        <li class="nav-item dropdown">
                        <a
                            class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                            >
                            <i class="fas fa-bell"></i>
                            <span class="badge rounded-pill badge-notification bg-danger"
                                >1</span
                            >
                        </a>
                        <ul
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                            >
                            <li><a class="dropdown-item" href="#">Some news</a></li>
                            <li><a class="dropdown-item" href="#">Another news</a></li>
                            <li>
                            <a class="dropdown-item" href="#">Something else here</a>
                            </li>
                        </ul>
                        </li>

                        {/* <!-- Icon --> */}
                        <li class="nav-item">
                        <a class="nav-link me-3 me-lg-0" href="#">
                            <i class="fas fa-fill-drip"></i>
                        </a>
                        </li>
                        {/* <!-- Icon --> */}
                        <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#">
                            <i class="fab fa-github"></i>
                        </a>
                        </li>

                        {/* <!-- Icon dropdown --> */}
                        <li class="nav-item dropdown">
                        <a
                            class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                            >
                            <i class="united kingdom flag m-0"></i>
                        </a>
                        </li>

                        {/* <!-- Avatar --> */}
                        <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
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
                {/* <!-- Navbar --> */}
            </header>
            </>
        )

    }
}

export default Sidebar;
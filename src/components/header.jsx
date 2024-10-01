import React from 'react';
import "./header.css";

const Header = () => {
  return (
    <div className='' style={{position: "sticky", top: "0", zIndex: "1"}}>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark-blue px-4">
      <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
              <img src="/paid2workk_logo.png" alt="Logo" height="40" class="me-2" />
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">

              <form class="d-flex position-relative search-container" style={{height: "2.6rem;"}}>
                  <span class="input-group-text search-icon" style={{backgroundColor: "#f1f1f1", position: "absolute", left: "5px", top: "24px", border: "none"}}><i class="fas fa-search" style={{border: "none;"}}></i></span>
                  <input class="form-control rounded-pill search-input" style={{paddingTop: "2px"}} type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-light rounded-pill dropdown-toggle search-button" style={{backgroundColor: "#cec7c7;"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Projects
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#">Talents</a></li>
                      <li><a class="dropdown-item" href="#">Projects</a></li>
                      <li><a class="dropdown-item" href="#"> Jobs</a></li>
                  </ul>
              </form>

              <div class="d-flex align-items-center ms-4">
                  <img src="/boss-pic.png" alt="Profile Image" class="rounded-circle" width="40" height="40" />
                  <div class="ms-2 text-white">
                      <div>@vedpal1988</div>
                      <div>$0.00 USD</div>
                  </div>
              </div>

          </div>
      </div>
      </nav>            



      {/* <nav class="sub-navbar">
          <div class="">
              <ul class="nav justify-content-start" id="navbar" style={{marginLeft: "-1.4rem"}}>
                  <li class="nav-item">
                      <a class="nav-link active" href="#" data-content="dashboard">Dashboard</a>
                  </li>
                
                  <li class="nav-item">                                                                 
                      <a class="nav-link" href="#" data-content="my-projects">My Projects</a>                           
                  </li>                                                                                                  

                  <li class="nav-item">                                                                                 
                      <a class="nav-link" href="#" data-content="lists">Lists</a>                                       
                  </li>                                                                                                     

                  <li class="nav-item">                                                                                             
                      <a class="nav-link" href="#" data-content="tasklists">Tasklists</a>                                                                                   
                  </li>                                                                                                                                                                     

                  <li class="nav-item">                                                                                                                                                                                 
                      <a class="nav-link" href="#" data-content="inbox">Inbox</a>                                                                                                                                   
                  </li>                                                                                                                                                                                 
                    
                  <li class="nav-item">                                                                                                                     
                      <a class="nav-link" href="#" data-content="feedback">Feedback</a>                                                                                 
                  </li>                                                                                                                             
              </ul>
          </div>
      </nav> */}



    </div>
  )
}

export default Header

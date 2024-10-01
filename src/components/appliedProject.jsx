import React, { useEffect, useState } from 'react';

import "./appliedProject.css";

const AppliedProject = () => {
  const [allBids, setAllBids] = useState([]);
  const [savedBids, setSavedBids] = useState([]);
  const [searchApplied, setSearchApplied] = useState('');
  const [searchSaved, setSearchSaved] = useState('');
  
  const fetchProjects = async (query = '') => {
    try {
      const ClientId = sessionStorage.getItem('NUserID');

      if (!ClientId) {
        console.error('Unable to fetch Client ID from session storage.');
        return;
      }

      const url = `https://freelancerapp.somee.com/GetBid?freelancerId=${ClientId}&ProjectTitle=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAllBids(data);
      const filteredSavedBids = data.filter(bid => bid.projectStatus === "true" && bid.like === true);
      setSavedBids(filteredSavedBids);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const displayBids = (bids) => {
    return bids.map(bid => (
      <tr key={bid.projectId}>
        console.log(bid);
        <td><a href={`project-details.html?projectId=${encodeURIComponent(bid.projectId)}`}>{bid.projectTitle || 'N/A'}</a></td>
        <td>{bid.bidAmount ? `₹${bid.bidAmount.toFixed(2)}` : 'N/A'}</td>
        <td className="description">{bid.bidDescription || 'N/A'}</td>
        <td>{bid.bidTimestamp ? new Date(bid.bidTimestamp).toLocaleDateString() : 'N/A'}</td>
        <td>{bid.username || 'N/A'}</td>
        <td>
          <button className="btn btn-edit">Edit</button>
          <div className="btn-group">
            <button type="button" className="btn btn-edit dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </td>
      </tr>
    ));
  };

  const filterBids = (query, bids) => {
    if (!query) return bids;
    return bids.filter(bid => 
      (bid.projectTitle && bid.projectTitle.toLowerCase().includes(query.toLowerCase())) ||
      (bid.bidDescription && bid.bidDescription.toLowerCase().includes(query.toLowerCase()))
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue px-4">
      <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
              <img src="/paid2workk_logo.png" alt="Logo" height="40" className="me-2" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <form className="d-flex position-relative search-container" style={{height: "2.6rem;"}}>
                  <span className="input-group-text search-icon" style={{backgroundColor: "#f1f1f1", position: "absolute", left: "5px", top: "23px", border: "none"}}><i className="fas fa-search" style={{border: "none;"}}></i></span>
                  <input className="form-control rounded-pill search-input" style={{paddingTop: "12px"}} type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-light rounded-pill dropdown-toggle search-button" style={{backgroundColor: "#cec7c7;"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Projects
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href="#">Talents</a></li>
                      <li><a className="dropdown-item" href="#">Projects</a></li>
                      <li><a className="dropdown-item" href="#"> Jobs</a></li>
                  </ul>
              </form>

              <div className="d-flex align-items-center ms-4">
                  <img src="/boss-pic.png" alt="Profile Image" className="rounded-circle" width="40" height="40" />
                  <div className="ms-2 text-white">
                      <div>@vedpal1988</div>
                      <div>$0.00 USD</div>
                  </div>
              </div>

          </div>
      </div>
      </nav>

      <div className="mt-4">
        <h4>Projects, Contests and Quotes</h4>
        <br />
        
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active fw-bold" id="applied-tab" data-bs-toggle="tab" data-bs-target="#applied" type="button" role="tab" aria-controls="applied" aria-selected="true">Applied Project</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="progress-tab" data-bs-toggle="tab" data-bs-target="#progress" type="button" role="tab" aria-controls="progress" aria-selected="false">Work in Progress</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="past-tab" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab" aria-controls="past" aria-selected="false">Past Projects</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="saved-tab" data-bs-toggle="tab" data-bs-target="#saved" type="button" role="tab" aria-controls="saved" aria-selected="false">Saved Projects</button>
          </li>
        </ul>
              
        <div className="tab-content mt-3" id="myTabContent">
          <div className="tab-pane fade show active" id="applied" role="tabpanel" aria-labelledby="applied-tab">
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <div className="input-group w-75">
                <span className="input-group-text" id="search-applied-addon"><i className="bi bi-search"></i></span>
                <input id="search-applied-input" type="text" className="form-control" placeholder="Search Projects" value={searchApplied} onChange={(e) => setSearchApplied(e.target.value)} />
              </div>
            </div>
            <table className="table table-bordered mt-3">
              <thead>

                <tr>
                  <th>Project Name</th>
                  <th>Bid Amount</th>
                  <th>Bid Description</th>
                  <th>Bid Date</th>
                  <th>Client Name</th>
                  <th>Actions</th>
                </tr>

              </thead>
              <tbody>
                {displayBids(filterBids(searchApplied, allBids))}
              </tbody>
            </table>
          </div>
          <div className="tab-pane fade" id="progress" role="tabpanel" aria-labelledby="progress-tab">
            <p>This is the Work in Progress.</p>
          </div>
          <div className="tab-pane fade" id="past" role="tabpanel" aria-labelledby="past-tab">
            <p>This is the Past Projects.</p>
          </div>
          <div className="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="saved-tab">
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <div className="input-group w-75">
                <span className="input-group-text" id="search-saved-addon"><i className="bi bi-search"></i></span>
                <input id="search-saved-input" type="text" className="form-control" placeholder="Search Saved Projects" value={searchSaved} onChange={(e) => setSearchSaved(e.target.value)} />
              </div>
            </div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Bid Amount</th>
                  <th>Bid Description</th>
                  <th>Bid Date</th>
                  <th>Client Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayBids(filterBids(searchSaved, savedBids))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AppliedProject;

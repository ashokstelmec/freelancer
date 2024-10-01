import React, { useState, useEffect } from 'react';
import "./talentSearch.css";
import Navbar from './navbar';

const TalentSearchResults = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  const getQueryParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const getUserByUsername = (username) => {
    const url = `https://freelancerapp.somee.com/GetUsersByName?username=${username}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUserData(data))
      .catch(error => {
        setError('Error fetching user data');
      });
  };

  useEffect(() => {
    const username = getQueryParameter('username');
    if (username) {
      getUserByUsername(username);
    } else {
      setError('No username provided in the URL.');
    }
  }, []);

  const redirectToTalentSearch = () => {
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue px-4">
        <div className="container-fluid px-5">
        <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/paid2workk_logo.png" alt="Logo" height="40" className="me-2" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex position-relative search-container" style={{ height: '2.5rem', width: '50%', marginRight: '1rem' }} onSubmit={redirectToTalentSearch}>
            <span className="input-group-text search-icon" style={{ backgroundColor: '#f1f1f1', position: 'absolute', left: '5px', top: '23px', border: 'none' }}>
                <i className="fas fa-search" style={{ border: 'none' }} onClick={redirectToTalentSearch}></i>
            </span>
            <input id="search-input" className="form-control rounded-pill search-input" style={{ paddingTop: '12px' }} type="search" placeholder="Search" aria-label="Search" />
            <select className="btn btn-light rounded-pill nav-option" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#fff', border: 'none', background: 'gray', padding: '5px' }}>
                <option>Talents</option>
                <option>Projects</option>
            </select>
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

        {/* <Navbar /> */}
        <div className=" px-5">
            <h4 className="my-4 text-start">Talent Search Results</h4>
            <div id="user-info" className="row text-start">
                {error ? (
                <p className="no-user-message">{error}</p>
                ) : (
                userData.map((user) => (
                    <div key={user.username} className="col-lg-4 col-md-6 mb-4">
                        <div className="card expert-card">
                            <img src={user.photopath || 'https://via.placeholder.com/150'} className="card-img-top" alt="User Image" />
                            <div className="card-body expert-card-body">
                            <h5 className="card-title">{user.username}</h5>
                            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                            <p><strong>Joining Date:</strong> {new Date(user.createdOn).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</p>
                            <div className="bio-container">
                                <span className="bio-text">{user.bio}</span>
                            </div>
                            <div><strong>Skills:</strong> {user.skill ? user.skill.split(',').map(skill => <span className="skills" key={skill}>{skill.trim()}</span>) : 'No skills listed'}</div>
                            </div>
                        </div>
                    </div>
                ))
                )}
            </div>
        </div>
    </>
  );
};

export default TalentSearchResults;
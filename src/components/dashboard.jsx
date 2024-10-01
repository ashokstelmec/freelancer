import React, { useEffect, useState } from 'react';
import "./dashboard.css";

// Components for Tabs and Profile Sidebar
const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('best-matches');
  const [bestMatches, setBestMatches] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  // Fetch session data for skills and userID
  const getSessionSkills = () => sessionStorage.getItem('skill') || '';
  const getUserID = () => sessionStorage.getItem('NUserID') || '';

  const fetchProjects = () => {
    const skills = getSessionSkills();
    if (!skills) return;

    const url = `https://freelancerapp.somee.com/api/Projects_/FilterProjects?skill=${encodeURIComponent(skills)}`;
    fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'))
      .then(data => setBestMatches(data))
      .catch(error => console.error('Error fetching project data:', error));
  };

  // Fetch Saved Jobs based on UserID
  const fetchSavedJobs = () => {
    const userID = getUserID();
    if (!userID) return;

    const url = `https://freelancerapp.somee.com/api/Projects_/GetSavedProjects?UserID=${encodeURIComponent(userID)}`;
    fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch saved jobs'))
      .then(data => setSavedJobs(data))
      .catch(error => console.error('Error fetching saved jobs:', error));
  };

  // Display jobs based on the selected tab
  const displayJobs = (jobs) => {
    if (!jobs.length) {
      return <p>No jobs found.</p>;
    }
    return jobs.map(job => (
      <div key={job.id} className="job-listing">
        <div className="d-flex justify-content-between">
          <h5>{job.title}</h5>
          <i className="fa-regular fa-heart"></i>
        </div>
        <div className="job-details">
          <span>{job.paymentType}</span>
          <span>{job.experienceLevel}</span>
          <span>{job.duration}</span>
          <span>{job.hoursPerWeek}</span>
        </div>
        <p>{job.description.substring(0, 200)}...</p>
        <div className="tags">
          {job.skills.map(skill => <span key={skill}>{skill}</span>)}
        </div>
        <div className="job-footer">
          <span>{job.paymentVerified ? 'Payment verified' : 'Payment unverified'}</span>
          <span>{job.rating} stars</span>
          <span>{job.clientName}</span>
        </div>
      </div>
    ));
  };

  // Handle tab switching and fetch appropriate content
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'best-matches') fetchProjects();
    if (tab === 'saved-jobs') fetchSavedJobs();
  };

  // Redirect to search results page when Submit is clicked
  const handleSearch = () => {
    if (query) {
      window.location.href = `dashboard-search.html?projectName=${encodeURIComponent(query)}`;
    }
  };

  // Fetch Best Matches on initial render
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="content-area">
      <div className="container-wrapperr"> 
        <div className="main-content">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              id="searchInputt"
              type="text"
              placeholder="Browse jobs that match your experience to a client's hiring"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="btn py-2.5" style={{ marginTop: '1px' }} onClick={handleSearch}>
              Submit
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'best-matches' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('best-matches')}
            >
              Best Matches
            </div>
            <div
              className={`tab ${activeTab === 'saved-jobs' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('saved-jobs')}
            >
              Saved Jobs
            </div>
          </div>

          {/* Tab Content */}
          <div id="best-matches" className={`tab-content ${activeTab === 'best-matches' ? 'active' : ''}`}>
            {displayJobs(bestMatches)}
          </div>
          <div id="saved-jobs" className={`tab-content ${activeTab === 'saved-jobs' ? 'active' : ''}`}>
            {displayJobs(savedJobs)}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="user-profile">
            <div className="profile-user">
              <img src="/profile_logo_1.png" alt="Profile Picture" />
              <div className="profile-info">
                <h5>Bhaskar D.</h5>
                <p>Software Developer</p>
              </div>
            </div>
            <a href="#">Complete your profile</a>
            <div className="profile-progress">
              <div className="progress-bar"></div>
              <span>40%</span>
            </div>
          </div>

          <div className="promote-ads">
            <h4>Promote with Ads</h4>
            <div className="ooption">
              <span>Availability Badge</span>
              <span>Off</span>
            </div>
            <div className="ooption">
              <span>Boost Your Profile</span>
              <span>Off</span>
            </div>
          </div>

          <div className="links">
            <a href="#">Upwork Academy</a>
            <a href="#">Get Paid</a>
            <a href="#">Community & Forums</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

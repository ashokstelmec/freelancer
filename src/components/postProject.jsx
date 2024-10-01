import React, { useState } from 'react';
import "./postProject.css";

const PostProject = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
   
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (jobTitle.trim() === '') {
      setErrorMessage('Please provide a job title.');
      return;
    }

    // Clear any previous errors
    setErrorMessage('');

    // Store title in session storage
    sessionStorage.setItem('projectTitle', jobTitle.trim());

    try {
      // Retrieve ClientId from session storage
      const ClientId = sessionStorage.getItem('NUserID');

      // If ClientId is null or undefined, show an error
      if (!ClientId) {
        setErrorMessage('Unable to fetch Client ID from session storage.');
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('ClientId', ClientId);
      formData.append('Title', jobTitle.trim());

      // Send the request
      const response = await fetch('https://freelancerapp.somee.com/api/Projects_/RegisterProject', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text(); // Use .text() to handle raw text response

      // Store project ID in session storage
      sessionStorage.setItem('projectId', data);

      // Redirect to the next page if response is OK
      window.location.href = 'post-project-1.html';
    } catch (error) {
      // Handle any errors
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="post-project-container mt-5">
        
      <div className="post-project-content px-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="step-indicator mb-2">1/5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job post</div>
            <h1 className="section-title my-5 fw-normal" style={{ fontSize: '3rem' }}>
              Let's start with a strong<br /> title.
            </h1>
            <p className="section-description">
              This helps your job post stand out to the right candidates. It's the first<br /> thing they'll see, so make it count!
            </p>
          </div>
          
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 my-5">
                <label htmlFor="jobTitle" className="form-label">
                  Write a title for your job post
                </label>
                <input
                  type="text"
                  className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                  id="jobTitle"
                  placeholder="Title of your Job"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </div>
            </form>
            <h6 className="mt-5">Example titles</h6>
            <ul className="example-titles">
              <li>Build responsive WordPress site with booking/payment functionality</li>
              <li>AR experience needed for virtual product demos (ARCore)</li>
              <li>Developer needed to update Android app UI for new OS/device specs</li>
            </ul>
          </div>
        </div>
      </div>
    
      <div className="d-flex justify-content-between mt-5 px-5">
        <button className="btn-back py-1" onClick={() => window.history.back()}>
          Back
        </button>
        <button className="btn-next py-1" type="submit" onClick={handleSubmit}>
          Next: Skills
        </button>
      </div>
    
    </div>
  );
};

export default PostProject;

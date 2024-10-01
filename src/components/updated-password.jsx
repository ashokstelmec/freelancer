import React from 'react';
import "./updated-password.css";

const PasswordUpdated = () => {
  const handleLoginClick = () => {
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div className="email-icon">
        <img src="/paid2work-logo.jpeg" alt="Email Icon" style={{ width: '50%' }} />
      </div>
        
      <h3>Password updated successfully</h3>

      <p>Your password has been updated successfully</p>
      <br />

      <button className="btn-green" onClick={handleLoginClick}>
        Login
      </button>
      <br />
      <br />
    </div>
  );
};

export default PasswordUpdated;

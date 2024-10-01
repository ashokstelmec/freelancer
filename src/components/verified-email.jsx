import React from 'react';
import "./verified-email.css";

const EmailVerificationSuccess = () => {
  return (
    <div className="container">
      <div className="email-icon">
        <img src="/paid2work-logo.jpeg" alt="Email Icon" style={{ width: '70%' }} />
      </div>

      <h3>Email Verification Successful</h3>
      <p>Your request has been verified successfully</p>
      <br />

      <a href="login.html">
        <button className="btn-green" id="send-again-btn">Login</button>
      </a>
      <br />
      <br />
    </div>
  );
};

export default EmailVerificationSuccess;

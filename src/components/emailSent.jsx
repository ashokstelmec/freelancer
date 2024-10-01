import React from 'react';
import "./email-sent.css";

const EmailSent = () => {
  const handleLoginClick = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className='email-container'>
      <div className="logo">
        <img src="/paid2work-logo.jpeg" alt="Paid2work Logo" style={{ width: '200%' }} />
      </div>
      
      <div className="header-links">
        <a href="/login" className="an-account">Already have a Paid2workk account?</a>
        <br />
        <a href="/login" className="an-account log-in">Log In</a>
      </div>

      <div className="containeer">
        <div className="content">
          <img src="/email-loggoo.png" alt="Email Icon" style={{ width: '35%' }} />
          <h2>Email sent!</h2>
          <p>We've sent an email to your email address. Follow the steps provided in the email to update your password or select Log In if you don't want to change your password at this time.</p>
          <button onClick={handleLoginClick} className="log-in-button">Log In</button>
          <br />
          <br />
          <a href="mailto:support@paid2workk.com" className="not-getting-email">Didn't receive email?</a>
        </div>
      </div>

      <div className="footer">
        <p>© 2015 - 2024 Paid2workk Global Inc. - Privacy Policy</p>
      </div>
    </div>
  );
};

export default EmailSent;

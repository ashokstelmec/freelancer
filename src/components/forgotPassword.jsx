import React, { useState } from 'react';
import "./forgotPassword.css";

const ForgetPassword = () => {
  const [emailUsername, setEmailUsername] = useState('');

  const handleSendEmail = () => {
    const trimmedEmailUsername = emailUsername.trim();
    if (!trimmedEmailUsername) {
      alert('Please enter your username or email address.');
      return;
    }

    const apiUrl = `https://freelancerapp.somee.com/ForgotPassword?email=${encodeURIComponent(trimmedEmailUsername)}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('An email has been sent to your registered mail Id. Please check your email Inbox');
        } else if (result.error && result.error === 'Token is expired') {
          alert('Token is expired. A new token has been sent to your email address.');
          window.location.href = '/login';
        } else {
          alert('Failed to send password reset email. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while sending the password reset email. Please try again.');
      });
  };

  const handleCancel = () => {
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <div className='forgot-password-container'>
      <div className="logo">
        <img src="/paid2work-logo.jpeg" alt="Paid2work Logo" style={{ width: '200%' }} />
      </div>
      <div className="header-links">
        <a href="/login">Already have a Paid2workk account?</a>
        <br />
        <a href="/login" className="log-in">Log In</a>
      </div>
      <div className="containeerr">
        <img src="/email-loggoo.png" alt="Envelope Icon" style={{ width: '35%' }} />
        <h2>Update your password</h2>
        <p>Enter your username or email address and select Send Email.</p>
        <div style={{ float: 'left', marginBottom: '0.4rem' }}>Username or Email</div>
        <input
          type="text"
          id="email-username"
          placeholder="Username or Email"
          value={emailUsername}
          onChange={(e) => setEmailUsername(e.target.value)}
        />
        <div className="button">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="send-email" onClick={handleSendEmail}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

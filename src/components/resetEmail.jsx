import React, { useEffect, useState } from 'react';
import "./resetEmail.css";

const ResetEmail = () => {
  const [emailAddress, setEmailAddress] = useState('');
  
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setEmailAddress(email);
    } else {
      console.error('No email address found.');
    }
  }, []);

  const handleSendAgain = () => {
    if (!emailAddress) {
      console.error('No email address to resend.');
      return;
    }

    const data = {
      Email: emailAddress, 
    };

    fetch('https://freelancerapp.somee.com/Resentmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('Verification email has been sent again.');
        } else {
          alert('Failed to resend verification email. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while resending the email. Please try again.');
      });
  };

  return (
    <div className='reset-email-body'>
        <div className="reset-email-container">
        <div className="email-icon">
            <img src="/paid2work-logo.jpeg" alt="Email Icon" style={{ width: '70%' }} />
        </div>
        <h3>Reset your Password to continue</h3>
        <p>
            We just sent an email to the address: <strong>{emailAddress || 'support@paid2workk.com'}</strong>
        </p>
        <p>Please check your email and select the link provided to reset your password.</p>
        <br />
        <button className="btn-green" onClick={handleSendAgain}>
            Send again
        </button>
        <br />
        <br />
        <a href="#" className="link">
            Didn't receive email?
        </a>
        <br />
        <div className="login-page">
            <a href="login.html">Click here to go to Login Page</a>
        </div>
        </div>
    </div>
  );
};

export default ResetEmail;

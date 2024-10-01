import React, { useState, useEffect } from 'react';
import './verify-email.css';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  
  // Fetch email from session storage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error('No email address found.');
    }
  }, []);
  
  const handleResendEmail = async () => {
    if (!email) {
      console.error('No email address to resend.');
      return;
    }

    const data = { Email: email };

    try {
      const response = await fetch('https://freelancerapp.somee.com/Resentmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert('Verification email has been sent again.');
      } else {
        alert('Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while resending the email. Please try again.');
    }
  };

  return (
    <div className="ccontainer">
      <div className="email-icon">
        <img src="/paid2work-logo.jpeg" alt="Email Icon" style={{ width: '70%' }} />
      </div>
      <h3>Verify your email to continue</h3>
      <p>We just sent an email to the address: <strong>{email}</strong></p>
      <p>Please check your email and select the link provided to verify your address.</p>
      <br />
      <button className="btn-green" onClick={handleResendEmail}>Send again</button>
      <br />
      <br />
      <a href="3" className="link">Didn't receive email?</a>
      <br />
      <div className="login-page">
        <a href="login.html">Click here to go to Login Page</a>
      </div>
    </div>
  );
};

export default VerifyEmail;

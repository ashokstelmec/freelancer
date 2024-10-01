import React, { useState, useEffect } from 'react';
import "./update-password.css";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  // Function to get query parameters by name
  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  // Function to enable or disable the Update Password button based on password match
  useEffect(() => {
    const valid = newPassword.length >= 8 && newPassword === confirmPassword;
    setIsPasswordValid(valid);
    setAlertVisible(!valid && confirmPassword !== '');
  }, [newPassword, confirmPassword]);

  // Event listener for the Update Password button
  const handleUpdatePassword = () => {
    const email = getQueryParam('email');
    const token = getQueryParam('token');

    fetch(`https://freelancerapp.somee.com/ChangePass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email,
        password: newPassword,
        token,
      }).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Password updated successfully!');
          window.location.href = 'nextPage.html';
        } else {
          alert('Error updating password: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while updating your password.');
      });
  };

  return (
    <div className='main-container'>
      <div className="logo">
        <img src="/paid2work-logo.jpeg" alt="Paid2work Logo" style={{ width: '200%' }} />
      </div>

      <div className="header-links">
        <a href="login.html">Already have a Paid2workk account?</a>
        <br />
        <a href="login.html" className="log-in">Log In</a>
      </div>

      <div className="containerr">
        <div className="content">
          <img src="/email-loggoo.png" alt="Email Icon" style={{ width: '35%' }} />
          <h1>Update your password</h1>
          <p>Enter your new password and confirm it below.</p>
          <input
            type="password"
            placeholder="New Password"
            minLength="10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            minLength="10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {alertVisible && (
            <div className="alert">
              Passwords do not match or do not meet the minimum length of 8 characters.
            </div>
          )}
          <div className="update-password">
            <button
              onClick={handleUpdatePassword}
              disabled={!isPasswordValid}
              style={{ backgroundColor: isPasswordValid ? '#4caf50' : '#ddd' }}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>© 2015 - 2024 Paid2workk Global Inc. - Privacy Policy</p>
      </div>
    </div>
  );
};

export default UpdatePassword;

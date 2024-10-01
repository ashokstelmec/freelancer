import React, { useState } from 'react';
import './signUp.css'; 

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleOptionClick = (value) => {
    setSelectedRole(value);
    sessionStorage.setItem('selectedRole', value);
    setIsButtonEnabled(true);
  };

  const handleCreateAccountClick = () => {
    if (isButtonEnabled) {
      window.location.href = './registration.html';
    }
  };

  return (
    <div className="container">
      <div>
        <img src="/paid2work-logo.jpeg" alt="Paid2Work Logo" style={{ width: '70%', height: '100px' }} />
      </div>
      <br />
      <h1>Join as a client or freelancer</h1>

      <div
        className={`option ${selectedRole === '0' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('0')}
      >
        <input type="radio" id="client" name="role" checked={selectedRole === '0'} readOnly />
        <label htmlFor="client">
          <div className="icon">👔</div>
          <p>I'm a client,<br />hiring for a project</p>
        </label>
      </div>

      <div
        className={`option ${selectedRole === '1' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('1')}
      >
        <input type="radio" id="freelancer" name="role" checked={selectedRole === '1'} readOnly />
        <label htmlFor="freelancer">
          <div className="icon">💼</div>
          <p>I'm a freelancer,<br />looking for work</p>
        </label>
      </div>

      <button
        className={`btn-create ${isButtonEnabled ? 'enabled' : ''}`}
        onClick={handleCreateAccountClick}
        disabled={!isButtonEnabled}
      >
        Create Account
      </button>

      <a href="login.html" className="login-link">
        Already have an account? <span>Log In</span>
      </a>
    </div>
  );
};

export default SignUp;

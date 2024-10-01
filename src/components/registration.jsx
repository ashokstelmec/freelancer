import React, { useState, useEffect } from 'react';
import "./registration.css";

const Registration = () => {
  const [selectedRole, setSelectedRole] = useState(sessionStorage.getItem('selectedRole') || '1');
  const [countries, setCountries] = useState([{ country_Id: 'India', country_Name: 'India' }]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'India',
    tips: false,
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedRole) {
      window.location.href = 'verify-email.html';
      return;
    }

    fetch('https://freelancerapp.somee.com/GetActiveCountry')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching country data:', error));
  }, [selectedRole]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);                          
    sessionStorage.setItem('selectedRole', role);                   
  };                                            

  const handleInputChange = (e) => {                            
    const { name, value, type, checked } = e.target;                            
    setFormData((prevFormData) => ({                                            
      ...prevFormData,                                                  
      [name]: type === 'checkbox' ? checked : value,                                    
    }));                                                            
  };                                        

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const submissionData = new FormData();
    submissionData.append('userID', null);
    submissionData.append('username', `${formData.firstName} ${formData.lastName}`);
    submissionData.append('email', formData.email);
    submissionData.append('password', formData.password);
    submissionData.append('roleId', parseInt(selectedRole, 10));
    submissionData.append('privacy', formData.tips);
    submissionData.append('mailsubs', formData.tips);
    submissionData.append('country', formData.country);

    fetch('https://freelancerapp.somee.com/addRegistration', {
      method: 'POST',
      body: submissionData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text().then((text) => {
            if (text.includes('Successfully Saved')) {
              return { success: true };
            }
            throw new Error('Unexpected response format.');
          });
        } else if (response.status === 400) {
          throw new Error('This Email Id Already Exists');
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      })
      .then((result) => {
        if (result.success) {
          sessionStorage.setItem('email', formData.email);
          window.location.href = 'verify-email.html';
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='registrationn-body'>
        <div className="container-div">
        {isLoading && (
            <div className="loader" id="loader" style={{display: "none"}}>
                <div className="spinner"></div>
            </div>
        )}

        <div>
            <img src="/paid2work-logo.jpeg" alt="Logo" style={{ width: '100%' }} />
        </div>
        <br />
        <div className="toggle-buttons">
            <button
            className={`toggle-button freelancer ${selectedRole === '0' ? 'active' : ''}`}
            onClick={() => handleRoleChange('0')}
            >
            Freelancer
            </button>
            <button
            className={`toggle-button client ${selectedRole === '1' ? 'active' : ''}`}
            onClick={() => handleRoleChange('1')}
            >
            Client
            </button>
        </div>
        <br />
        <form id="signup-form" onSubmit={handleSubmit}>
            <div className="form-group-names">
            <div className="form-group">
                <label htmlFor="first-name">First name</label>
                <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Last name</label>
                <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                />
            </div>
            </div>
            <div className="form-group">
            <label htmlFor="email">Work email address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group password-container">
            <label htmlFor="password">Password</label>
            <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="8 or more characters"
                minLength="8"
                required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
            </div>
            <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
            >
                {countries.map((country) => (
                <option key={country.country_Id} value={country.country_Id}>
                    {country.country_Name}
                </option>
                ))}
            </select>
            </div>
            <div className="form-group-check">
            <input
                type="checkbox"
                id="tips"
                name="tips"
                checked={formData.tips}
                onChange={handleInputChange}
            />
            <label htmlFor="tips">
                Send me emails with tips on how to find talent that fits my needs.
            </label>
            </div>
            <div className="form-group-check mt-3">
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="terms">
                    Yes, I understand and agree to the{' '}
                    <a href="#">Pay2workk Terms of Service</a>, including the{' '}
                    <a href="#">User Agreement</a> and <a href="#">Privacy Policy</a>.
                </label>
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create my account'}
            </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="an-account">
            Already have an account? <a href="login.html">Log In</a>
        </p>
        </div>
    </div>
  );
};

export default Registration;

import React, { useState, useEffect } from 'react';
import "./postProjectss.css";

const BudgetEstimator = () => {
  const [budgetType, setBudgetType] = useState(null); // 0 for hourly rate, 1 for fixed price
  const [currency, setCurrency] = useState('$');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Sync currency dropdowns
    setCurrency(budgetFrom);
  }, [currency]);

  const handleNextClick = async () => {
    const budgetFromValue = parseFloat(budgetFrom);
    const budgetToValue = parseFloat(budgetTo);

    // Validate inputs
    if (
      isNaN(budgetFromValue) ||
      isNaN(budgetToValue) ||
      budgetFromValue <= 0 ||
      budgetToValue <= 0 ||
      budgetFromValue >= budgetToValue ||
      budgetType === null
    ) {
      setErrorMessage('Please enter a valid budget range.');
      return;
    }

    setErrorMessage('');

    // Retrieve ClientId from session storage
    const ClientId = sessionStorage.getItem('NUserID');
    const projectId = sessionStorage.getItem('projectId');

    if (!ClientId) {
      setErrorMessage('Unable to fetch Client ID from session storage.');
      return;
    }

    // Prepare FormData for API call
    const formData = new FormData();
    formData.append('ClientId', ClientId);
    formData.append('NProjectId', projectId);
    formData.append('Budget', `${budgetTo}`);
    formData.append('MaxBudget', `${budgetFrom}`);
    formData.append('PaidBy', budgetType); // 0 for hourly rate, 1 for fixed price
    formData.append('Currency', currency === '$' ? 1 : currency === 'INR' ? 2 : 1); // Assuming $=1, INR=2, defaulting to 1 for other cases

    // Call the API
    try {
      const response = await fetch('https://freelancerapp.somee.com/api/Projects_/RegisterProject', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        window.location.href = 'post-project-4.html';
      } else {
        alert('Failed to register project');
      }
    } catch (error) {
      console.error('Error registering project:', error);
      alert('Failed to register project. Please try again.');
    }
  };

  return (
    <div className='budget-container'>
        <div className="budget-sub-container">
            <div className="budget-content">
                <div className="row">
                  <div className="col-lg-6">
                      <div className="mb-4">
                      <div className="step-indicator">4/5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job post</div>
                      </div>

                      <h2 className="section-title" style={{ opacity: 0.9 }}>Tell us about your budget.</h2>
                      <p>This will help us match you to talent within your range.</p>
                  </div>

                  <div className="col-lg-6">
                      <div className="d-flex gap-5 mb-4">
                      <div
                          className={`radio-card ${budgetType === 0 ? 'active' : ''}`}
                          onClick={() => setBudgetType(0)}
                      >
                          <div className="circle"></div>
                          <input type="radio" id="hourly-rate" name="budget-type" />
                          <label htmlFor="hourly-rate">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                              <path d="M8 3.5a.5.5 0 0 1 .5.5v4.25H11a.5.5 0 0 1 0 1H7.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" />
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
                          </svg>
                          <br />
                          Hourly rate
                          </label>
                      </div>

                      <div
                          className={`radio-card ${budgetType === 1 ? 'active' : ''}`}
                          onClick={() => setBudgetType(1)}
                      >
                          <div className="circle"></div>
                          <input type="radio" id="fixed-price" name="budget-type" />
                          <label htmlFor="fixed-price">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
                              <path d="M2 2v5.5a1.5 1.5 0 0 0 .44 1.06l5.5 5.5a1.5 1.5 0 0 0 2.12 0l5.5-5.5a1.5 1.5 0 0 0 0-2.12l-5.5-5.5A1.5 1.5 0 0 0 8.5 2H2zm1 1h5.5a.5.5 0 0 1 .35.15l5.5 5.5a.5.5 0 0 1 0 .7l-5.5 5.5a.5.5 0 0 1-.7 0l-5.5-5.5A.5.5 0 0 1 3 7.5V3zm3 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                          <br />
                          Fixed price
                          </label>
                      </div>
                      </div>

                      <div>
                      <div>
                          <label className="fs-5">From</label>
                          <div className="input-group d-flex justify-content-between gap-4">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className=""
                                style={{ width: '20%', borderRadius: '5px', borderColor: '#ddd' }}
                            >
                              <option value="$" selected>$</option>
                              <option value="€">€</option>
                              <option value="£">£</option>
                              <option value="INR">INR</option>
                            </select>
                          <input
                              type="number"
                              value={budgetFrom}
                              onChange={(e) => setBudgetFrom(e.target.value)}
                              className="form-control py-2"
                              // style={{ width: '50%' }}
                              placeholder="Enter the Amount"
                          />
                          <span className="input-group-text">/hr</span>
                          </div>
                      </div>

                      <br />
                      <div>
                          <label className="fs-5">To</label>
                          <div className="input-group d-flex gap-4">
                          <select
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              className=""
                              style={{ width: '20%', borderRadius: '5px', borderColor: '#ddd' }}
                          >
                              <option value="$" selected>$</option>
                              <option value="€">€</option>
                              <option value="£">£</option>
                              <option value="INR">INR</option>
                          </select>
                          <input
                              type="number"
                              value={budgetTo}
                              onChange={(e) => setBudgetTo(e.target.value)}
                              className="form-control py-2"
                              placeholder="Enter the Amount"
                          />
                          <span className="input-group-text">/hr</span>
                          </div>
                      </div>
                      </div>

                      {errorMessage && (
                      <div id="error-message" className="error-message" style={{ display: 'block' }}>
                          {errorMessage}
                      </div>
                      )}
                  </div>
                </div>

                <br />
                <div style={{ borderTop: '2px solid #000', marginBlock: '4rem' }}></div>
                  
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-custom btn-back py-1">Back</button>
                    <button className="btn btn-custom btn-next py-1" onClick={handleNextClick}>
                        Next
                    </button>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default BudgetEstimator;

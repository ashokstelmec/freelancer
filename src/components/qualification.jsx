import React, { useState } from 'react';
import "./qualification.css";

const Qualification = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);                                                                                                                                                                                       
  const [loading, setLoading] = useState(false);                                                                            

  const handleOptionClick = (value) => {                                                                    
    setSelectedExperience(value);                                       
  };                                                        

  const handleSkip = () => {
    window.location.href = '/biodata';
  };

  const submitData = async () => {
    const userID = sessionStorage.getItem('NUserID'); 
    const Lavel = selectedExperience;

    if (!userID || !Lavel) {
      alert('Required data missing. Please ensure userID and Lavel are available.');
      return;
    }

    const formData = new FormData();
    formData.append('NUserID', userID);
    formData.append('Lavel', Lavel);

    setLoading(true);                                           
    
    try {
      const response = await fetch('https://freelancerapp.somee.com/Update_About', {                    
        method: 'POST',                                                                                                 
        body: formData,                                                                                     
      });

      setLoading(false);                                                        

      if (response.ok) {
        window.location.href = '/biodata';
      } else {
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='qualification-container'>
        <div className="containner">
        <div className="logoo">
            <img src="/paid2work-logo.jpeg" alt="Paid2Workk Logo" />
        </div>
        <div className="questionnaire">
            <h2>A few quick questions :</h2>
            <div className="options">
            <label className={`option ${selectedExperience === '0' ? 'active' : ''}`} onClick={() => handleOptionClick('0')}>
                <input type="radio" name="experience" value="0" checked={selectedExperience === '0'} readOnly />
                <img src="/search (1).png" alt="Search Icon" />
                <p>I am brand new to this</p>
            </label>
            <label className={`option ${selectedExperience === '1' ? 'active' : ''}`} onClick={() => handleOptionClick('1')}>
                <input type="radio" name="experience" value="1" checked={selectedExperience === '1'} readOnly />
                <img src="/experience-logoo.png" alt="Pen Icon" style={{ width: '40%' }} />
                <p>I have some experience</p>
            </label>
            <label className={`option ${selectedExperience === '2' ? 'active' : ''}`} onClick={() => handleOptionClick('2')}>
                <input type="radio" name="experience" value="2" checked={selectedExperience === '2'} readOnly />
                <img src="/expert-logo.png" alt="Expert Icon" />
                <p>I am an expert</p>
            </label>
            </div>

            <div className="buttons">
            <a href="/signUp">
                <button className="back">Back</button>
            </a>
            <div style={{display: 'flex', gap: '0.7rem'}}>
                <button className="skip" onClick={handleSkip}>
                Skip for now
                </button>
                <button
                id="nextBtn"
                onClick={submitData}
                disabled={!selectedExperience}
                >
                Next
                </button>
            </div>

            </div>

        </div>

        {loading && (
            <div className="loader" id="loader">
            <div className="spinner"></div>
            </div>
        )}
        </div>
    </div>
  );
};

export default Qualification;

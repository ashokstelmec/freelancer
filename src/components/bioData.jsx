import React, { useState } from 'react';
import "./bioData.css";

const BioData = () => {
  const [bio, setBio] = useState('');                                                         
  const [charCount, setCharCount] = useState(0);                                  
  const [resumeFile, setResumeFile] = useState(null);                                   
  const [resumeFileName, setResumeFileName] = useState('');                       
  const [isSubmitting, setIsSubmitting] = useState(false);        

  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value);
    setCharCount(value.length);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setResumeFileName(file.name);
    } else {
      alert('Please select a PDF file.');
      e.target.value = ''; 
    }
  };

  const handleSubmit = async () => {
    if (charCount < 100 || !resumeFile) {
      alert('Please enter a bio with at least 100 characters and upload a resume.');
      return;
    }

    const userID = sessionStorage.getItem('NUserID');
    if (!userID) {
      alert('User ID is missing');
      return;
    }

    const formData = new FormData();
    formData.append('NUserID', userID);
    formData.append('Bio', bio);
    formData.append('type', 'Resume');
    formData.append('File', resumeFile);

    try {
      setIsSubmitting(true);
      const response = await fetch('https://freelancerapp.somee.com/Updatebio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = 'skills.html';
      } else {
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='biodata-container'>
        <div className="contaainer">
        
        <div className="loogo">
            <img src="/paid2work-logo.jpeg" alt="Paid2Work Logo" style={{ width: '70%' }} />
        </div>                  

        <div className="questionnaire">
            <h2>Great. Now write a bio to tell the world about yourself.</h2>
            <p>
              Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now.
            </p>

            <textarea
            id="bio-textarea"
            className="bio-textarea"
            placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
            value={bio}
            onChange={handleBioChange}
            ></textarea>

            <div className="char-count" style={{ color: charCount >= 100 ? 'green' : 'red' }}>
            {charCount >= 100 ? `${charCount} characters` : `At least 100 characters (${charCount} characters)`}
            </div>

            <div className="upload-resume">

            <button onClick={() => document.getElementById('resume-file-input').click()}>
                Upload your resume
            </button>

            <input
                type="file"
                id="resume-file-input"
                className="hidden-file-input"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div className="file-preview">{resumeFileName}</div>
            </div>

            <div className="butttons">               
                <a href="qualification.html">                           
                    <button className="back">Back</button>                              
                </a>                            
                <div>
                    <a href="skills.html">
                    <button className="skiip">Skip for now</button>
                    </a>
                    <button className="next" disabled={charCount < 100 || !resumeFile} onClick={handleSubmit}>
                    Next
                    </button>
                    {isSubmitting && <div className="loader"></div>}
                </div>
            </div>
        </div>            
                                        
        <div className="overlay" style={{ display: isSubmitting ? 'block' : 'none' }}></div>
        <div className="loader" style={{ display: isSubmitting ? 'block' : 'none' }}></div>
        </div>
    </div>
  );
};

export default BioData;

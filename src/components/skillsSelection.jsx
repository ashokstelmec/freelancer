import React, { useState, useEffect } from 'react';
import "./skillsSelection.css";

const SkillsSelection = () => {             
  const [allSkills, setAllSkills] = useState([]);               
  const [selectedSkills, setSelectedSkills] = useState([]);           
  const [filteredSkills, setFilteredSkills] = useState([]);         
  const [inputValue, setInputValue] = useState('');     
  const [loading, setLoading] = useState(false);        
  
  const maxSkills = 15;       

  useEffect(() => {
    // Fetch skills on component mount
    const fetchSkills = async () => {
      try {
        const response = await fetch('https://freelancerapp.somee.com/api/Projects_/GetActiveSkills');
        if (!response.ok) throw new Error('Failed to fetch skills');
        const skills = await response.json();
        setAllSkills(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []); 

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setInputValue(input);
    if (input.length > 0) {
      const filtered = allSkills.filter(skill =>
        skill.skillName.toLowerCase().includes(input)
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };  

  const addSkill = (skillName) => {
    if (selectedSkills.length >= maxSkills) {
      alert('Maximum of 15 skills allowed');
      return;
    }
    if (!selectedSkills.includes(skillName)) {
      setSelectedSkills([...selectedSkills, skillName]);
      setInputValue('');
      setFilteredSkills([]);
    }
  };  

  const removeSkill = (skillName) => {  
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillName)); 
  };  

  const saveSkills = async () => {  
    if (selectedSkills.length === 0) {  
      alert('Please select at least one skill before saving.'); 
      return; 
    } 

    setLoading(true);
    const userID = sessionStorage.getItem('NUserID');
    const formData = new FormData();
    formData.append('NUserID', userID);
    formData.append('Skill', selectedSkills.join(','));

    try {
      const response = await fetch('https://freelancerapp.somee.com/Update_About', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = '/rate';
      } else {
        alert('Failed to save skills');
      }
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Failed to save skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  return (        
    <div className='skills-container'>            
        <div className="contaiiner">              
                                        
          <div className="headerr">
              <div className="logoo">
                  <img src="/paid2work-logo.jpeg" alt="Logo" style={{ width: '40%' }} />
              </div>
          </div>

          <div className="contennt">
              <div className="left">
              <h2>Nearly there! What work are you here to do?</h2>
              <p>Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Add or remove the ones we've suggested, or start typing to pick more. It's up to you.</p>
              <div className="skills-tags">
                  {selectedSkills.map(skill => (
                  <div key={skill} className="tag">
                      {skill}
                      <span className="remove" onClick={() => removeSkill(skill)}>x</span>
                  </div>
                  ))}
              </div>  

              <div className="dropdown">
                  <input
                  type="text"
                  className="filter-input"
                  placeholder="Enter skills here"
                  value={inputValue}
                  onChange={handleInputChange}
                  />
                  {filteredSkills.length > 0 && (
                  <div className="dropdown-menu">
                      {filteredSkills.map(skills => (
                      <div
                          key={skills.skillName}
                          className="dropdown-item"
                          onClick={() => addSkill(skills.skillName)}
                      >
                          {skills.skillName}
                      </div>
                      ))}
                  </div>
                  )}
              </div>

              <span className="max-skills" style={{float: "left"}}>Max 15 skills</span>
              <button className='skills-save-btn' onClick={saveSkills} disabled={selectedSkills.length === 0} style={{float: "right"}}>Save and Continue</button>
              </div>
              <div className="right">
              <div className="tip">
                  <p>
                    Tip: Adding skills helps us match you with relevant jobs!
                  </p>
              </div>
              </div>
          </div>
                  
          {loading && (
              <div className="overlay">

              <div className="loader"></div>
              </div>
          )}

        </div>
    </div>
  );
};

export default SkillsSelection;

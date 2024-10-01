import React, { useState, useEffect } from 'react';
import "./postProjects.css";

const SkillsComponent  = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const maxSkills = 15;

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('https://freelancerapp.somee.com/api/Projects_/GetActiveSkills');
      const data = await response.json();
      const skills = data.map(skill => skill.skillName);
      setAllSkills(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const filterSkills = (e) => {
    const input = e.target.value.toLowerCase();
    setSkillInput(input);
    if (input) {
      const filtered = allSkills.filter(skill => skill.toLowerCase().includes(input));
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
    }
    setSkillInput('');
    setFilteredSkills([]);
  };

  const removeSkill = (skillName) => {
    const updatedSkills = selectedSkills.filter(skill => skill !== skillName);
    setSelectedSkills(updatedSkills);
  };

  const saveSkills = async () => {
    if (selectedSkills.length === 0) {
      setErrorMessage('Please add at least one skill before proceeding.');
      return;
    }

    setErrorMessage('');
    showLoader();

    const projectId = sessionStorage.getItem('projectId');
    const ClientId = sessionStorage.getItem('NUserID');

    if (!ClientId) {
      setErrorMessage('Unable to fetch Client ID from session storage.');
      hideLoader();
      return;
    }

    const formData = new FormData();
    formData.append('ClientId', ClientId);
    formData.append('NProjectId', projectId);
    formData.append('Skill', selectedSkills.join(','));

    try {
      const response = await fetch('https://freelancerapp.somee.com/api/Projects_/RegisterProject', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = 'post-project-3.html'; // Navigate to the next page
      } else {
        alert('Failed to save skills');
      }
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Failed to save skills. Please try again.');
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  };

  const hideLoader = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  return (
    <div className="main-container">
      <div className="content-container mt-5">
        <div className="content-row">
          <div className="col-md-6 column-left">
            <div className="progress-step">2/5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job post</div>
            <h2 className="header-title fw-normal">
              What are the main skills<br /> required for your work?
            </h2>
          </div>
          <div className="col-md-6">
            <div className="search-bar">
              <label className="mb-3">Search skills or add your own</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search skills or add your own"
                  value={skillInput}
                  onChange={filterSkills}
                />
                <span className="icon">&#128269;</span>
                {filteredSkills.length > 0 && (
                  <div className="dropdown-menu">
                    {filteredSkills.map(skill => (
                      <div
                        key={skill}
                        className="dropdown-item"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
            <p className="text-muted">For the best results, add 3-5 skills</p>
            <div className="selected-skills">
              {selectedSkills.map(skill => (
                <span key={skill} className="badge">
                  {skill}
                  <span
                    className="ms-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
            <div className="popular-skills">
              <h5>Popular skills for Mobile App Development</h5>
              <div className="d-flex flex-wrap">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    className="btn"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-buttons">
        <button className="btn-back py-1" onClick={() => window.history.back()}>
          Back
        </button>
        <button className="btn-next py-1" onClick={saveSkills}>
          Next: Scope
        </button>
      </div>

      <div className="overlay" id="overlay"></div>
      <div className="loader" id="loader"></div>
    </div>
  );
};

export default SkillsComponent;

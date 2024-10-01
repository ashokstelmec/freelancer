import React, { useState, useEffect } from 'react';
import "./postProjectsss.css";

const JobPostForm = () => {
    const [description, setDescription] = useState('');
    const [charCount, setCharCount] = useState(50000);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isReviewButtonEnabled, setIsReviewButtonEnabled] = useState(false);

    const maxLength = 50000;

    // Handle description input change and update character count
    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        setDescription(text);
        setCharCount(maxLength - text.length);
        checkFormCompletion(text, file);
    };

    // Handle file input change and file validation
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            const fileSize = (selectedFile.size / 1024).toFixed(2); // Convert to KB
            setFileName(`${selectedFile.name} (${fileSize} KB)`);
            setFile(selectedFile);
        } else {
            setFileName('Invalid file type. Please select a PDF.');
            setFile(null);
        }
        checkFormCompletion(description, selectedFile);
    };

    // Check if the form is complete and enable/disable the review button
    const checkFormCompletion = (descriptionText, fileInput) => {
        const isDescriptionFilled = descriptionText.trim() !== '';
        const isFileValid = !fileInput || fileInput.type === 'application/pdf';
        setIsReviewButtonEnabled(isDescriptionFilled && isFileValid);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectId = sessionStorage.getItem('projectId');
        const ClientId = sessionStorage.getItem('NUserID');

        if (!ClientId) {
            alert('Unable to fetch Client ID from session storage.');
            return;
        }

        const formData = new FormData();
        formData.append('ClientId', ClientId);
        formData.append('NProjectId', projectId);
        formData.append('Description', description);

        if (file) {
            formData.append('NFile', file);
        }

        try {
            const response = await fetch('https://freelancerapp.somee.com/api/Projects_/RegisterProject', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = 'review-project.html'; // Redirect to the next page
            } else {
                alert('Failed to submit project details');
            }
        } catch (error) {
            console.error('Error submitting project details:', error);
            alert('Failed to submit project details. Please try again.');
        }
    };

    return (
        <div className="container-custom mx-5">
            <form id="job-post-form" onSubmit={handleSubmit}>
                <div className="row mx-5">
                    <div className="col-md-8">
                        <p className="text-muted">5/5 &nbsp;&nbsp;&nbsp;Job post</p>
                        <h2>Start the conversation.</h2>
                        <div className="bullet-points">
                            <br />
                            <p>Talent are looking for:</p>
                            <ul>
                                <li>Clear expectations about your task or deliverables</li>
                                <li>The skills required for your work</li>
                                <li>Good communication</li>
                                <li>Details about how you or your team like to work</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p><strong>Describe what you need</strong></p>
                        <textarea
                            className="form-control description-textarea"
                            placeholder="Already have a description? Paste it here!"
                            maxLength={maxLength}
                            value={description}
                            onChange={handleDescriptionChange}
                            id="description"
                            name="description"
                        />
                        <p className="text-muted text-end mt-1" id="charCount">{charCount.toLocaleString()} characters left</p>
                        <p><strong>Need help?</strong></p>
                        <p><a href="#" className="text-success">See examples of effective descriptions</a></p>

                        <label htmlFor="file-input" className="btn-custom">
                            <i className="fas fa-paperclip"></i>&nbsp;&nbsp;&nbsp;&nbsp; Attach file
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className="file-input"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                        <p className="text-muted mt-3">Max file size: 100 MB</p>
                        <p id="fileName" className="file-name">{fileName}</p>
                    </div>
                </div>

                <div style={{ borderTop: '2px solid #000', marginBlock: '1rem' }}></div>

                <div className="footer-nav d-flex justify-content-between mx-5">
                    <a href="post-project-3.html">
                        <button type="button" className="btn btn-back">Back</button>
                    </a>
                    <button
                        type="submit"
                        className={`btn btn-review ${isReviewButtonEnabled ? 'active' : ''}`}
                        disabled={!isReviewButtonEnabled}
                    >
                        Review Job Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobPostForm;

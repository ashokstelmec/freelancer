import React from 'react';


const ClientPostProject = () => {
  const handlePostProject = () => {
    // Handle post project action
  };

  const handleCancel = () => {
    // Handle cancel action
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="confirmation-container bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '900px' }}>
        <h2 className="text-center font-weight-bold mb-4">Are these details correct?</h2>
          
        <div className="row">
          {/* Project Summary */}
          <div className="col-md-4 text-center border-right">
            <img
              src="https://via.placeholder.com/80"
              alt="Project Icon"
              className="mb-2 img-fluid"
            />
            <p className="font-weight-bold">PROJECT</p>
            <p className="font-weight-bold h4">₹12,500 – 37,500 INR</p>
          </div>

          {/* Project Description */}
          <div className="col-md-8">
            <h3 className="font-weight-bold mb-3">
              Expert Frontend Developer for Interactive Website
            </h3>
            <p>
              I'm on the hunt for an adept frontend developer who can capture users
              with a meticulously minimalist design. Here's an overview of the project:
            </p>

            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <strong>Must-Have Skills:</strong> Expertise in HTML, CSS, JavaScript is fervently required. If you excel in creating minimalist websites that captivate users through simplicity, you're just who I need.
              </li>
              <li className="mb-2">
                <strong>Website Interactivity:</strong> I'm not in pursuit of an everyday, stagnant website. I want high interactivity with real-time updates and web applications. Brilliant if you're adroit in animation or creating dynamic, fluid forms.
              </li>
              <li>
                <strong>Design Aesthetic:</strong> The design aesthetic should be minimalist. Implicit and clear functionality is key. A knack for producing crisp, clean interfaces would be golden.
              </li>
            </ul>

            <p>
              If your skill set ticks all these boxes, don't hesitate to place your
              bid! Let's forge an awesome website together. Convince me with your
              portfolio showcasing similar projects.
            </p>

            {/* Skill Tags */}
            <div className="mt-4">
              <span className="badge badge-secondary mr-2">Website Design</span>
              <span className="badge badge-secondary mr-2">JavaScript</span>
              <span className="badge badge-secondary mr-2">CSS</span>
              <span className="badge badge-secondary mr-2">HTML</span>
              <span className="badge badge-secondary mr-2">HTML5</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="btn btn-pink btn-block mt-4"
          onClick={handlePostProject}
          style={{ backgroundColor: '#e60278', color: 'white' }}
        >
          Yes, post my project
        </button>
      </div>

      {/* Cancel Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-pink px-5 py-2"
          onClick={handleCancel}
          style={{ backgroundColor: '#e60278', color: 'white', fontSize: '1.3rem' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClientPostProject;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faTasks } from '@fortawesome/free-solid-svg-icons';

const ClientProposals = () => {
  const [activeTab, setActiveTab] = useState('details');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="px-5">
      <div className="row my-4">
        <div className="col-12">
          <div className="d-flex gap-4">
            <h2>Graphic Designer Needed</h2>
            <p className="mt-2 px-3" style={{ backgroundColor: 'rgb(224, 247, 247)', borderRadius: '25px' }}>
              No Freelancer Selected
            </p>
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => handleTabClick('details')}
              >
                Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'proposals' ? 'active' : ''}`}
                onClick={() => handleTabClick('proposals')}
              >
                Proposals
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'upgrades' ? 'active' : ''}`}
                onClick={() => handleTabClick('upgrades')}
              >
                Upgrades
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'files' ? 'active' : ''}`}
                onClick={() => handleTabClick('files')}
              >
                Files
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'tasklists' ? 'active' : ''}`}
                onClick={() => handleTabClick('tasklists')}
              >
                Tasklists
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'share' ? 'active' : ''}`}
                onClick={() => handleTabClick('share')}
              >
                Share
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-9">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div id="details" className="content-section active">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <div className="proposal-header d-flex justify-content-between">
                  <div className="d-flex">
                    <img src="/profile_logo_1.png" alt="Profile" className="img-fluid" style={{ width: '60px', height: '60px' }} />
                    <div className="proposal-info ms-3">
                      <h5>LIYAN IT SOLUTION @ghanshyamsaini</h5>
                      <p className="mb-1">PHP/Laravel/WordPress/WooCommerce/ Shopify/Magento</p>
                      <div className="proposal-rating d-flex align-items-center">
                        {[...Array(5)].map((_, index) => (
                          <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#e60278' }} />
                        ))}
                        <span className="ms-2">4.9</span>
                      </div>
                      <div className="proposal-stats d-flex align-items-center mt-2">
                        <FontAwesomeIcon icon={faUser} />
                        <span className="ms-2">714</span>
                        <FontAwesomeIcon icon={faTasks} className="ms-4" />
                        <span className="ms-2">98%</span>
                      </div>
                      <p className="mt-2">India</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-success mb-1">₹350.00 INR</h4>
                    <p className="mb-1">per hour</p>
                    <button className="btn btn-primary btn-sm">Recommended</button>
                  </div>
                </div>
                <p className="mt-3">
                  Hello, Hope you are doing well! I specialize in modern graphic design with expertise in Photoshop,
                  Illustrator, and InDesign. I'll create a sleek logo that captures your brand essence, design posters
                  with a contemporary aesthetic, and develop packaging that aligns seamlessly with your brand identity.
                  With a commitment to excellence, I'll...
                </p>
                <div className="proposal-actions text-end mt-3">
                  <button className="btn btn-outline-success btn-sm me-2">Chat</button>
                  <button className="btn btn-success btn-sm">Award</button>
                </div>
              </div>
            </div>
          )}

          {/* Proposals Tab */}
          {activeTab === 'proposals' && (
            <div id="proposals" className="content-section">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <div className="proposal-header d-flex justify-content-between">
                  <div className="d-flex">
                    <img src="/profile-image2.jpg" alt="Profile" className="img-fluid" style={{ width: '60px', height: '60px' }} />
                    <div className="proposal-info ms-3">
                      <h5>Azabache Producciones @AzabacheProdu</h5>
                      <p className="mb-1">Your one-stop partners for digital solutions</p>
                      <div className="proposal-rating d-flex align-items-center">
                        <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} />
                        <span className="ms-2">4.9</span>
                      </div>
                      <div className="proposal-stats d-flex align-items-center mt-2">
                        <FontAwesomeIcon icon={faUser} />
                        <span className="ms-2">328</span>
                        <FontAwesomeIcon icon={faTasks} className="ms-4" />
                        <span className="ms-2">98%</span>
                      </div>
                      <p className="mt-2">United States</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-success mb-1">₹1,669.80 INR</h4>
                    <p className="mb-1">per hour</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upgrades Tab */}
          {activeTab === 'upgrades' && (
            <div id="upgrades" className="content-section">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <h5>Upgrades Content</h5>
                <p>Details about upgrades go here...</p>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div id="files" className="content-section">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <h5>Files Content</h5>
                <p>Details about files go here...</p>
              </div>
            </div>
          )}

          {/* Tasklists Tab */}
          {activeTab === 'tasklists' && (
            <div id="tasklists" className="content-section">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <h5>Tasklists Content</h5>
                <p>Details about tasklists go here...</p>
              </div>
            </div>
          )}

          {/* Share Tab */}
          {activeTab === 'share' && (
            <div id="share" className="content-section">
              <div className="proposal-card p-3 mb-4 bg-white shadow-sm rounded">
                <h5>Share Content</h5>
                <p>Details about sharing options go here...</p>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="col-lg-3">
          <div className="side-panel p-3 bg-white shadow-sm rounded text-center">
            <img src="/side-panel-image.jpg" alt="Side Panel" className="img-fluid rounded" />
            <p className="mt-3">
              Not sure who to hire? Our expert Recruiters will find you the perfect freelancer. Upgrade your project now and get a
              handpicked freelancer recommendation.
            </p>
            <button className="btn btn-primary mt-2">Upgrade to Recruiter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProposals;

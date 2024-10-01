import React from 'react';
import "./sharePage.css";

const SharePage = () => {
  return (
    <div className='share-page-body'>
      <div className="d-flex">
        <nav className="navbar navbar-expand-lg ml-5 mr-1" style={{ backgroundColor: '#001f3f', width: '100%', margin: '0 auto 0 0' }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <img src="/paid2work-logo.jpeg" alt="paid2 workk design" style={{ width: '24%' }} />
              </ul>
              <form className="d-flex" role="search" style={{ width: '60%' }}>
                <div className="input-group">
                  <span className="input-group-text" id="search-addon">
                    <i className="bi bi-search"></i>
                  </span>
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#">Category 1</a></li>
                    <li><a className="dropdown-item" href="#">Category 2</a></li>
                    <li><a className="dropdown-item" href="#">Category 3</a></li>
                  </ul>
                </div>
              </form>
                <div className="d-flex justify-content-center align-items-center gap-3 mr-3">
                  <button className="log-in-btn">Log in</button>
                  <button className="sign-up-btn">Sign up</button>
                </div>
            </div>
          </div>
        </nav>

        {/* <div className="d-flex justify-content-between align-items-end gap-3 mr-5">
          <a href="./login.html"><button className="log-in-btn">Log in</button></a>
          <a href="./registration.html"><button className="sign-up-btn">Sign up</button></a>
        </div> */}
        
      </div>

      <br />

      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="bg-white p-4 shadow-sm rounded">
            <ul className="nav nav-tabs custom-nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" id="details-tab" data-bs-toggle="tab" href="#details">Details</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="proposals-tab" data-bs-toggle="tab" href="#proposals">Proposals</a>
              </li>
              <div className="d-flex justify-content-between" style={{ position: 'absolute', right: '3rem' }}>
                <i className="bi bi-bookmark fs-5 ml-5"></i>
                &nbsp;&nbsp;&nbsp;
                <i className="bi bi-share-fill fs-5"></i>
              </div>
            </ul>

            <div className="tab-content pt-3">
              <div className="tab-pane fade show active" id="details">
                <div className="share-page-container">
                  <div className="job-detailss">
                    <h2>.NET Core Developer</h2>
                    <p>Posted 44 minutes ago &nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-geo-alt-fill"></i> Worldwide</p>
                    <p>We need a .NET Core Developer to fix 2 API routes that interact with AWS S3 and Azure Blob Storage.</p>
                    <br />
                    <h3>Responsibilities:</h3>
                    <p>Fix and optimize .NET Core API routes for AWS S3 and Azure Blob Storage.</p>
                    <br />
                    <h3>Requirements:</h3>
                    <p>
                      Experience with .NET Core Web API.<br />
                      Familiarity with AWS S3 and Azure Blob Storage.
                    </p>
                    <br />
                    <div className="info">
                      <div>
                        <p><strong>$25.00</strong><br />Fixed price</p>
                      </div>
                      <div>
                        <p><strong>Expert</strong><br />Experience Level</p>
                      </div>
                      <div>
                        <p><strong><i className="bi bi-geo-alt-fill"></i> Remote Job</strong></p>
                      </div>
                    </div>
                    <div className="info">
                      <div>
                        <p><strong>One-time project</strong><br />Project Type</p>
                      </div>
                    </div>
                    <h3 className='mt-4'>Skills and Expertise</h3>
                    <div className="skills">
                      <span>Full Stack Development Skills</span>
                      <span>Amazon Web Services</span>
                      <span>Microsoft Azure</span>
                      <span>C#</span>
                      <span>.NET Core</span>
                      <span>ASP.NET MVC</span>
                      <span>+ 5 more</span>
                    </div>
                  </div>

                  <div className="activity">
                    <div>Proposals 5</div>
                    <div>Last viewed by client 43 minutes ago</div>
                    <div>Interviewing 1</div>
                    <div>Invites sent 1</div>
                    <div>Unanswered invites 1</div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="proposals">
                <p className='text-start'>This is the Proposals content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;

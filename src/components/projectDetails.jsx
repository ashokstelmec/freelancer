import React, { useState, useEffect } from "react";
import "./projectDetails.css";

const ProjectDetails = () => {
  const [project, setProject] = useState({});
  const [bidAmount, setBidAmount] = useState("20.00");
  const [deliveryTime, setDeliveryTime] = useState("7");
  const [proposal, setProposal] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch project details
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");
    const ClientId = sessionStorage.getItem("NUserID");

    if (!ClientId) {
      setErrorMessage("Unable to fetch Client ID from session storage.");
      return;
    }

    const userId = ClientId;
    
    if (!projectId) {
      console.error("Project ID is missing.");
      return;
    }

    fetch(`https://freelancerapp.somee.com/api/Projects_/GetProject?projectId=${projectId}&userid=${userId}`)
      .then((response) => response.json())
      .then(([data]) => {
        setProject(data);
        sessionStorage.setItem("post", data.clientId);
        sessionStorage.setItem("projectId", data.nProjectId);
      })
      .catch((error) => console.error("Error fetching project details:", error));

    // Fetch currency data
    fetch("https://freelancerapp.somee.com/api/Projects_/GetActiveCurrency")
      .then((response) => response.json())
      .then((data) => setCurrencies(data))
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const handleBidSubmission = () => {
    if (!bidAmount || !deliveryTime || !proposal || proposal.length < 100) {
      alert("Please fill in all fields correctly. Proposal must be at least 100 characters.");
      return;
    }

    const projectId = sessionStorage.getItem("projectId");
    const ClientId = sessionStorage.getItem("NUserID");
    const post = sessionStorage.getItem("post");

    const formData = new FormData();
    formData.append("FinishDate", `${deliveryTime}days`);
    formData.append("ClientId", post);
    formData.append("BidStatus", "Active");
    formData.append("ProjectId", projectId);
    formData.append("BidAmount", bidAmount);
    formData.append("FreelancerId", ClientId);
    formData.append("BidDescription", proposal);
    formData.append("Currency", currencyId);

    fetch("https://freelancerapp.somee.com/RegisterBids", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.trim() === "success") {
          alert("Bid submitted successfully!");
          window.location.reload();
        } else {
          alert("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please check the console for details.");
      });
  };

  const handleSaveJob = () => {
    const userId = sessionStorage.getItem("NUserID");
    const projectId = sessionStorage.getItem("projectId");

    const formData = new FormData();
    formData.append("FreelancerId", userId);
    formData.append("NProjectId", projectId);

    fetch("https://freelancerapp.somee.com/api/Projects_/SaveProject", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Job saved successfully!");
          window.location.reload();
        } else {
          alert("Failed to save job.");
        }
      })
      .catch((error) => {
        console.error("Error saving job:", error);
        alert("An error occurred while saving the job.");
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTimeAgo = (dateString) => {
    const timeAgo = new Date(dateString);
    const now = new Date();
    const diffInMs = now - timeAgo;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    }
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    }
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return `${diffInMinutes} minutes ago`;
  };

  return (
    <div className="mt-5 mx-5 project-details-container">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="bg-white p-4 shadow-sm rounded">
            <ul className="nav nav-tabs custom-nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" id="details-tab" data-bs-toggle="tab" href="#details">
                  Details
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="proposals-tab" data-bs-toggle="tab" href="#proposals">
                  Proposals
                </a>
              </li>
            </ul>

            <div className="tab-content pt-3">
              <div className="tab-pane fade show active" id="details">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">{project.title}</h4>
                  <div>
                    <button className="btn btn-primary me-2" id="applyNowButton" data-bs-toggle="modal" data-bs-target="#bidModal">
                      Apply Now
                    </button>
                    <button className="btn btn-outline-secondary" onClick={handleSaveJob} disabled={project.like}>
                      {project.like ? "Saved" : "Save Job"}
                    </button>
                  </div>
                </div>
                <p className="text-muted">{`Posted ${formatTimeAgo(project.createdAt)}`}</p>
                <br />
                <p>{project.description}</p>

                <h6 className="fw-bold">Job Details</h6>
                <div className="d-flex justify-content-between flex-wrap mb-3">
                  <div className="me-4 mb-2">
                    <i className="bi bi-cash me-2"></i>
                    {`$${project.budget?.toFixed(2)} - Max: $${project.maxBudget?.toFixed(2)}`}
                  </div>
                  <div className="me-4 mb-2">
                    <i className="bi bi-calendar me-2"></i>
                    {`Deadline: ${formatDate(project.deadline)}`}
                  </div>
                </div>
                <h6 className="fw-bold">Skills and Expertise</h6>
                <div className="d-flex flex-wrap mb-3">
                  {project.skill?.split(",").map((skill, index) => (
                    <span key={index} className="badge bg-secondary me-2 mb-2">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                <h6 className="fw-bold">Activity on this job</h6>
                <p>
                  Proposals: {project.proposals || "No proposals"} • Last viewed by client:{" "}
                  {formatTimeAgo(project.updatedAt || project.createdAt)} • Interviewing: {project.interviewing || 0} • Invites
                  sent: {project.invitesSent || 0} • Unanswered invites: {project.unansweredInvites || 0}
                </p>
              </div>

              <div className="tab-pane fade" id="proposals">
                <p>This is the Proposals content.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="bg-white p-4 shadow-sm rounded">
            <h6 className="fw-bold">About the Client</h6>
            <img
              src={project.clientPhoto || ""}
              alt="Client Photo"
              className="img-fluid mb-2 rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>
              <i className="bi bi-person me-2"></i>
              {project.clientName || "Client Name not available"}
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              {project.clientLocation || "Location not available"}
            </p>
            <p>
              <i className="bi bi-star me-2"></i>
              Rating: {project.clientRating || "N/A"} • Reviews: {project.clientReviews || 0}
            </p>
            <h6 className="fw-bold">Client Verification</h6>
            <p>
              <i className="bi bi-envelope me-2"></i>
              {project.clientVerified ? "Email Verified" : "Email Not Verified"}
            </p>
          </div>
        </div>
      </div>
                  
      {/* Bid Modal */}
      <div className="modal fade" id="bidModal" tabIndex="-1" aria-labelledby="bidModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bidModalLabel">
                Submit Your Bid
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="bidAmount" className="form-label">
                  Bid Amount ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currency" className="form-label">
                  Currency
                </label>
                <select
                  id="currency"
                  className="form-select"
                  value={currencyId}
                  onChange={(e) => setCurrencyId(e.target.value)}
                >
                  <option value="" disabled>
                    Select currency
                  </option>
                  {currencies.map((currency) => (
                    <option key={currency.currencyId} value={currency.currencyId}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="deliveryTime" className="form-label">
                  Delivery Time (in days)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="proposal" className="form-label">
                  Proposal (at least 100 characters)
                </label>
                <textarea
                  className="form-control"
                  id="proposal"
                  rows="4"
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  style={{textAlign: "left"}}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleBidSubmission}>
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

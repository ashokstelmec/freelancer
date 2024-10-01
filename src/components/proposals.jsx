import React, { useState, useEffect } from "react";
import "./proposals.css";
import Header from "./header";

const ProposalsList = () => {
  const [bids, setBids] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch bids on component mount
    const fetchBids = async () => {
      try {
        // Retrieve projectId from URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("nProjectId");

        if (!projectId) {
          throw new Error("Project ID not found in URL");
        }

        // Fetch bids using the projectId
        const response = await fetch(`https://freelancerapp.somee.com/GetBid?projectId=${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch bids");

        const fetchedBids = await response.json();

        // Check if bids array is empty
        if (fetchedBids.length === 0) {
          setBids([]);
        } else {
          setBids(fetchedBids);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
        setErrorMessage("Error loading proposals. Please try again later.");
      }
    };

    fetchBids();
  }, []);

  const toggleReadMore = (index) => {
    setBids((prevBids) =>
      prevBids.map((bid, i) =>
        i === index ? { ...bid, showFullDescription: !bid.showFullDescription } : bid
      )
    );
  };

  return (
    <>
        <Header />

        <div className="proposals-container mx-5 mt-5">
            <div className="text-left mb-4">
                <h3>Proposals List</h3>
            </div>

            <div id="proposals">
                {errorMessage ? (
                <p>{errorMessage}</p>
                ) : bids.length === 0 ? (
                <p>No proposals found.</p>
                ) : (
                bids.map((bid, index) => {
                    // Fallback for missing values
                    const username = bid.username || "Unknown Freelancer";
                    const skill = bid.skill || "No skills listed";
                    const photopath = bid.photopath || "https://via.placeholder.com/60";
                    const projectStatus = bid.projectStatus === "true" ? "Active" : "Inactive";
                    const bidDescription = bid.bidDescription || "No description provided";
                    const bidAmount = bid.bidAmount ? bid.bidAmount.toFixed(2) : "0.00";
                    const clientId = bid.clientId || "Unknown Client";

                    return (
                    <div className="card proposal-card mb-4" key={index}>
                        <div className="card-body d-flex">
                        <img src={photopath} alt="User Image" className="me-3" width="60" height="60" />
                        <div className="proposal-info">
                            <h5>{username} <span className="text-muted">@{username}</span></h5>
                            <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-secondary">Project Status: {projectStatus}</span>
                            </div>
                            <p className="mb-2">
                            {bid.showFullDescription
                                ? bidDescription
                                : `${bidDescription.substring(0, 100)}...`}
                            <span
                                className="read-more"
                                onClick={() => toggleReadMore(index)}
                                style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
                            >
                                {bid.showFullDescription ? "Read less" : "Read more"}
                            </span>
                            </p>
                            <div className="skills d-flex flex-wrap">
                            {skill.split(",").map((s, i) => (
                                <span key={i} className="badge bg-light me-2 mb-2">
                                {s.trim()}
                                </span>
                            ))}
                            </div>
                            <div className="response-time mt-2">
                            Bid placed on: {new Date(bid.bidTimestamp).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="proposal-price text-end ms-auto">
                            <strong>${bidAmount} USD</strong>
                            <br />
                            <span>Client ID: {clientId}</span>
                        </div>
                        </div>
                        <div className="card-footer text-right">
                        <a href="#" className="btn btn-link">
                            Report Bid
                        </a>
                        </div>
                    </div>
                    );
                })
                )}
            </div>
        </div>
    </>
  );
};

export default ProposalsList;

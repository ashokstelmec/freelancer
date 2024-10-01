import React, { useEffect, useState } from 'react';
import EditBidModal from './editModal';
import "./myProject.css";

const MyProject = () => {
  const [allBids, setAllBids] = useState([]);
  const [savedBids, setSavedBids] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editBid, setEditBid] = useState({ projectTitle: '', bidAmount: '', bidDescription: '', bid_id: '' });

  useEffect(() => {
    fetchProjects();
  }, [searchQuery]);

  const fetchProjects = async (query = '') => {
    try {
      const ClientId = sessionStorage.getItem('NUserID');
      const url = `https://freelancerapp.somee.com/GetBid?freelancerId=${ClientId}&ProjectTitle=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllBids(data);
      setSavedBids(data.filter(bid => bid.projectStatus === "true" && bid.like === true));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const displayBids = (bids) => {
    return bids.map(bid => (
      <tr key={bid.bid_id}>
        <td><a href={`project-details.html?projectId=${encodeURIComponent(bid.projectId)}`}>{bid.projectTitle || 'N/A'}</a></td>
        <td>{bid.bidAmount ? `₹${bid.bidAmount.toFixed(2)}` : 'N/A'}</td>
        <td>{bid.bidDescription || 'N/A'}</td>
        <td>{bid.bidTimestamp ? new Date(bid.bidTimestamp).toLocaleDateString() : 'N/A'}</td>
        <td>{bid.username || 'N/A'}</td>
        <td>
          <button className="btn btn-edit" data-bid-id={bid.bid_id} onClick={() => handleEditButtonClick(bid)}>Edit</button>
        </td>
      </tr>
    ));
  };

  const handleEditButtonClick = (bid) => {
    setEditBid({
      projectTitle: bid.projectTitle || '',
      bidAmount: bid.bidAmount || '',
      bidDescription: bid.bidDescription || '',
      bid_id: bid.bid_id,
    });
  };

  const handleSaveBid = async () => {
    const { bid_id, bidAmount, bidDescription } = editBid;

    const formData = new FormData();
    formData.append('bid_id', bid_id);
    formData.append('BidAmount', bidAmount);
    formData.append('BidDescription', bidDescription);

    try {
      const response = await fetch('https://freelancerapp.somee.com/RegisterBids', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const updatedBids = allBids.map(b => b.bid_id === bid_id ? { ...b, bidAmount, bidDescription } : b);
        setAllBids(updatedBids);
        setSavedBids(updatedBids.filter(bid => bid.projectStatus === "true" && bid.like === true));
      } else {
        console.error('Error saving bid: ', response.statusText);
      }
    } catch (error) {
      console.error('Error updating bid:', error);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="d-flex">Projects, Contests and Quotes</h4>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nava-item contests-button" role="presentation">
          <button className="nav-link active fw-bold" id="applied-tab" data-bs-toggle="tab" data-bs-target="#applied" type="button" role="tab" aria-controls="applied" aria-selected="true">Applied Project</button>
        </li>
        <li className="nava-item contests-button" role="presentation">
          <button className="nav-link fw-bold" id="progress-tab" data-bs-toggle="tab" data-bs-target="#progress" type="button" role="tab" aria-controls="progress" aria-selected="false">Work in Progress</button>
        </li>
        <li className="nava-item contests-button" role="presentation">
          <button className="nav-link fw-bold" id="past-tab" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab" aria-controls="past" aria-selected="false">Past Projects</button>
        </li>
        <li className="nava-item contests-button" role="presentation">
          <button className="nav-link fw-bold" id="saved-tab" data-bs-toggle="tab" data-bs-target="#saved" type="button" role="tab" aria-controls="saved" aria-selected="true">Saved Projects</button>
        </li>
      </ul>

      <div className="mt-3" id="myTabContent">
        <div className="tab-pane fade show active" id="applied" role="tabpanel" aria-labelledby="applied-tab">
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="input-group w-75">
              <span className="input-group-text" id="search-applied-addon"><i className="bi bi-search"></i></span>
              <input
                id="search-applied-input"
                type="text"
                className="form-control"
                placeholder="Search Applied Projects"
                aria-label="Search Applied Projects"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Bid Amount</th>
                <th>Bid Description</th>
                <th>Bid Date</th>
                <th>Client Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayBids(allBids)}
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade" id="progress" role="tabpanel" aria-labelledby="progress-tab">
          <p>This is the Work in Progress.</p>
        </div>

        <div className="tab-pane fade" id="past" role="tabpanel" aria-labelledby="past-tab">
          <p>This is the Past Projects.</p>
        </div>

        <div className="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="saved-tab">
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="input-group w-75">
              <span className="input-group-text" id="search-saved-addon"><i className="bi bi-search"></i></span>
              <input
                id="search-saved-input"
                type="text"
                className="form-control"
                placeholder="Search Saved Projects"
              />
            </div>
          </div>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Bid Amount</th>
                <th>Bid Description</th>
                <th>Bid Date</th>
                <th>Client Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayBids(savedBids)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal would go here */}

        <EditBidModal />

    </div>
  );
};

export default MyProject;

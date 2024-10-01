import React, { useState } from 'react';

const EditBidModal = ({ bidData, onSave }) => {
    const [projectTitle, setProjectTitle] = useState(bidData?.projectTitle || '');
    const [bidAmount, setBidAmount] = useState(bidData?.bidAmount || '');
    const [bidDescription, setBidDescription] = useState(bidData?.bidDescription || '');
    const [bidId, setBidId] = useState(bidData?.bidId || '');

    const handleSaveChanges = () => {

        const updatedBid = {
            projectTitle,
            bidAmount,
            bidDescription,
            bidId,
        };

        onSave(updatedBid);
    };

    return (

        <div className="modal fade" id="editBidModal" tabIndex="-1" aria-labelledby="editBidModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editBidModalLabel">Edit Bid</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="editBidForm">
                            <div className="mb-3">
                                <label htmlFor="editProjectTitle" className="form-label">Project Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editProjectTitle"
                                    value={projectTitle}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editBidAmount" className="form-label">Bid Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="editBidAmount"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editBidDescription" className="form-label">Bid Description</label>
                                <textarea
                                    className="form-control"
                                    id="editBidDescription"
                                    rows="3"
                                    value={bidDescription}
                                    onChange={(e) => setBidDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <input type="hidden" id="editBidId" value={bidId} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
                    
    );
};

export default EditBidModal;

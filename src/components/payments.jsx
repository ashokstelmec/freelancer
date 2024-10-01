import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import "./payment.css";
import Header from './header';

const Payments = () => {
  const [experts, setExperts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await fetch('https://freelancerapp.somee.com/GetAllUsers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setExperts(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const truncateBio = (bio, maxLength = 30) => {
    if (bio.length > maxLength) {
      return bio.substring(0, maxLength) + '...';
    }
    return bio;
  };

  const displayExperts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, experts.length);
    return experts.slice(startIndex, endIndex).map((user, index) => {
      const currencySymbol = user.currency === 1 ? '$' : '₹';
      return (
        <div className="col-md-3 mb-4" key={index}>
          <div className="expert-card">
            <img
              src={user.photopath || 'https://via.placeholder.com/80'}
              alt="Expert"
            />
            <div className="expert-name">{user.username || 'N/A'}</div>
            <div className="expert-title">
              {truncateBio(user.bio || 'N/A')}
            </div>
            <p>
              <i className="fas fa-tags icon"></i>
              {user.skill || 'N/A'}
            </p>
            <p>
              <i className="fas fa-money-bill-wave-alt icon"></i>
              {currencySymbol}
              {user.rate || 'N/A'} per hour
            </p>
            <p>
              <i className="fas fa-calendar-day icon"></i>
              Joined: {user.createdOn ? new Date(user.createdOn).toLocaleDateString() : 'N/A'}
            </p>
            <button className="book-button">Contact</button>
          </div>
        </div>
      );
    });
  };

  const loadPage = (page) => {
    if (page < 1 || page > Math.ceil(experts.length / itemsPerPage)) return;
    setCurrentPage(page);
  };

  return (
    <>
        {/* <Navbar /> */}
        <Header />
        <div className="mt-4">
        <div className="d-flex justify-content-between px-5">
            <div>
            <h4 className='' style={{textAlign: "left"}}>Your jobs</h4>
            <p>Complete these steps to stand out and hire fast</p>
            </div>
            <div>
            <a href="post-project.html">
                <button className="post-projectt">Post Project</button>
            </a>
            </div>
        </div>

        <div className="row mb-4 px-5">
            <div className="col-md-6">
            <div className="task-card">
                <i className="bi bi-wallet2 icon"></i>
                <span>
                <strong>Required to hire:</strong> Add a billing method. You
                could start hiring 3X faster.
                </span>
            </div>
            </div>
            <div className="col-md-6">
            <div className="task-card">
                <i className="bi bi-envelope-check icon"></i>
                <span>
                <strong>Required to hire:</strong> You verified your email
                address.
                </span>
            </div>
            </div>
        </div>

        <h5 style={{textAlign: "left"}} className='px-5'>Review your project’s goals with an expert, one-on-one</h5>
        <div className="row mb-4 px-5" id="expert-cards-container">
            {displayExperts()}
        </div>

        <div className="pagination-container d-flex gap-2 justify-end px-5">
            <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => loadPage(currentPage - 1)}
            >
            Previous
            </button>
            <button
            className="btn btn-primary"
            disabled={currentPage === Math.ceil(experts.length / itemsPerPage)}
            onClick={() => loadPage(currentPage + 1)}
            >
            Next
            </button>
        </div>
        </div>
    </>
  );
};

export default Payments;

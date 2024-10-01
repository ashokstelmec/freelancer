import React, { useEffect, useState } from 'react';
import "./dashboardSearch.css";
import Header from './header';

const DashboardSearch = () => {
    const [categories, setCategories] = useState([]);
    const [jobListings, setJobListings] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        minHourly: 0,
        maxHourly: 0,
        fixedPrice: false,
        lessThan100: false,
        hourly: false,
        entryLevel: false,
        intermediateLevel: false,
        expertLevel: false
    });

    useEffect(() => {
        // Fetch categories on component mount
        fetchCategories();
        // Fetch job listings on component mount
        fetchJobListings();
    }, []);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://freelancerapp.somee.com/api/Projects_/GetActiveSkills');
            const categories = await response.json();
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch job listings
    const fetchJobListings = async (updatedFilters = filters) => {
        const {
            sort, category, minHourly, maxHourly,
            fixedPrice, lessThan100, hourly,
            entryLevel, intermediateLevel, expertLevel
        } = updatedFilters;

        const urlParams = new URLSearchParams(window.location.search);
        const projectName = urlParams.get('projectName');

        try {
            let url = 'https://freelancerapp.somee.com/api/Projects_/FilterProjects?';
            if (projectName) url += `projectName=${encodeURIComponent(projectName)}&`;
            if (sort) url += `sort=${sort}&`;
            if (category) url += `skills=${encodeURIComponent(category)}&`;
            if (minHourly) url += `minHourly=${minHourly}&`;
            if (maxHourly) url += `maxHourly=${maxHourly}&`;
            if (fixedPrice) url += `fixedPrice=true&`;
            if (lessThan100) url += `lessThan100=true&`;
            if (hourly) url += `hourly=true&`;
            if (entryLevel) url += `experienceLevel=entryLevel&`;
            if (intermediateLevel) url += `experienceLevel=intermediateLevel&`;
            if (expertLevel) url += `experienceLevel=expertLevel&`;

            const response = await fetch(url);
            const projects = await response.json();
            setJobListings(projects);
        } catch (error) {
            console.error('Error fetching job listings:', error);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Format time ago
    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const timeDiff = now - date;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return days === 0 ? 'Today' : `${days} day(s) ago`;
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newFilters = {
            ...filters,
            [name]: type === 'checkbox' ? checked : value
        };
        setFilters(newFilters);
        fetchJobListings(newFilters);
    };

    // Handle save job
    const toggleSaveProject = async (projectId, isSaving) => {
        try {
            const url = isSaving
                ? `https://freelancerapp.somee.com/api/Projects_/SaveProject/${projectId}`
                : `https://freelancerapp.somee.com/api/Projects_/UnsaveProject/${projectId}`;
            await fetch(url, { method: 'POST' });
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <>
            <Header />

            <div className="mt-4 px-5 dashboard-container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-5">
                            <h5>Category</h5>
                            <select
                                className="form-select"
                                value={filters.category}
                                name="category"
                                onChange={handleFilterChange}
                            >
                                <option value="">Select Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.skillName}>
                                        {category.skillName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Experience level checkboxes */}
                        <div className="mb-5 experience-level">
                            <h5>Experience level</h5>
                            {['entryLevel', 'intermediateLevel', 'expertLevel'].map((level) => (
                                <div className="form-check" key={level}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={level}
                                        name={level}
                                        checked={filters[level]}
                                        onChange={handleFilterChange}
                                    />

                                    <label className="form-check-label" htmlFor={level}>
                                        {level === 'entryLevel' ? 'Entry Level' : level === 'intermediateLevel' ? 'Intermediate' : 'Expert'}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Job Type and Fixed Price inputs */}
                        <div className="mb-5">
                            <h5>Job type</h5>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="hourly"
                                    name="hourly"
                                    checked={filters.hourly}
                                    onChange={handleFilterChange}
                                />
                                <label className="form-check-label" htmlFor="hourly">
                                    Hourly (259)
                                </label>
                            </div>
                            {/* Hourly rate inputs */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="minHourly"
                                    value={filters.minHourly}
                                    placeholder="Min"
                                    onChange={handleFilterChange}
                                />
                                <span className="input-group-text">/hr</span>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="maxHourly"
                                    value={filters.maxHourly}
                                    placeholder="Max"
                                    onChange={handleFilterChange}
                                />
                                <span className="input-group-text">/hr</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5>Fixed-Price</h5>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="fixedPrice"
                                    name="fixedPrice"
                                    checked={filters.fixedPrice}
                                    onChange={handleFilterChange}
                                />
                                <label className="form-check-label" htmlFor="fixedPrice">
                                    Fixed-Price (148)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button className="btn btn-outline-secondary">
                                <i className="bi bi-rss"></i>
                            </button>
                            <button className="btn btn-outline-secondary">Save Job</button>
                            <div className="dropdown">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="sortByDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort by: {filters.sort || 'Newest'}
                                </button>
                                <ul className="dropdown-menu">
                                    {['newest', 'oldest', 'highestRated'].map((sortOption) => (
                                        <li key={sortOption}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                data-sort={sortOption}
                                                onClick={(e) => handleFilterChange({ target: { name: 'sort', value: sortOption } })}
                                            >
                                                {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Job listings container */}
                        <div id="jobListings">
                            {jobListings.length === 0 ? (
                                <p>No job listings found.</p>
                            ) : (
                                jobListings.map((project) => (
                                    <div key={project.nProjectId} className="job-listing mb-3" data-id={project.nProjectId}>
                                        <span className="job-posted">Posted {formatTimeAgo(project.createdAt)}</span>
                                        <h5>{project.title}</h5>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <img
                                                    src={project.clientPhoto}
                                                    alt={`${project.clientName}'s photo`}
                                                    className="img-thumbnail"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <span>{project.clientName}</span>
                                                <span>{project.budget} budget</span>
                                                <span>{project.clientOnline === 'True' ? 'Online' : 'Offline'}</span>
                                            </div>
                                            <div>
                                                <button
                                                    className={`btn btn-outline-secondary save-btn ${project.saved ? 'btn-saved' : ''}`}
                                                    onClick={() => toggleSaveProject(project.nProjectId, project.saved)}
                                                >
                                                    <i className={`bi bi-heart${project.saved ? '-fill' : ''}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p>Fixed price - {project.status === 'true' ? 'Active' : 'Inactive'} - Est. budget: ${project.budget.toFixed(2)}</p>
                                        <p>{project.description}</p>
                                        <div className="d-flex flex-wrap">
                                            {project.skill?.split(',').map((skill) => (
                                                <span key={skill} className="badge bg-secondary">
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-muted mt-2">Deadline: {formatDate(project.deadline)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DashboardSearch;

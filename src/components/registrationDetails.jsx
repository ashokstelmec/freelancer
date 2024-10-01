import React, { useState, useEffect } from "react";
import "./registrationDetails.css";

const RegistrationDetails = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    phone: "",
    postalCode: "",
    street: "",
    dob: "",
    experience: "",
    NUserID: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const NUserID = sessionStorage.getItem("NUserID");
    if (NUserID) {
      setFormData((prev) => ({ ...prev, NUserID }));
      loadUserDetails(NUserID);
    }
    loadCountries();
    populateExperienceLevels();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetch(
        "https://freelancerapp.somee.com/GetActiveCountry"
      );
      if (!response.ok) throw new Error("Failed to fetch countries");
      const countriesData = await response.json();
      setCountries(countriesData);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (countryId) => {
    try {
      const response = await fetch(
        `https://freelancerapp.somee.com/GetActiveState?CountryId=${countryId}`
      );
      if (!response.ok) throw new Error("Failed to fetch states");
      const statesData = await response.json();
      setStates(statesData);
      setCities([]); // Clear cities when states are updated
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const countryId = formData.country;
      const response = await fetch(
        `https://freelancerapp.somee.com/GetActiveCity?CountryId=${countryId}&State_Id=${stateId}`
      );
      if (!response.ok) throw new Error("Failed to fetch cities");
      const citiesData = await response.json();
      setCities(citiesData);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const populateExperienceLevels = () => {
    const experienceOptions = [];
    for (let i = 0; i <= 20; i++) {
      experienceOptions.push({ value: i, label: `${i} ${i === 1 ? "year" : "years"}` });
    }
    return experienceOptions;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormData({ ...formData, country: countryId, state: "", city: "" });
    if (countryId) await loadStates(countryId);
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setFormData({ ...formData, state: stateId, city: "" });
    if (stateId) await loadCities(stateId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a file in JPG, JPEG, or PNG format.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userID = sessionStorage.getItem("NUserID");

    const data = new FormData();
    data.append("NUserID", userID);
    data.append("PhoneNumber", formData.phone);
    data.append("City", formData.city);
    data.append("State", formData.state);
    data.append("Pin", formData.postalCode);
    data.append("Address", formData.street);
    data.append("Country", formData.country);
    data.append("DateOfBirth", formData.dob);
    data.append("Experince", formData.experience);

    try {
      const response = await fetch(
        "https://freelancerapp.somee.com/Update_About",
        { method: "POST", body: data }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      console.log("Profile updated successfully:", result);
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadUserDetails = async (NUserID) => {
    try {
      const response = await fetch(
        `https://freelancerapp.somee.com/GetUserPersonalDetails?NUserId=${NUserID}`
      );
      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      setFormData({
        ...formData,
        phone: data.phoneNumber || "",
        postalCode: data.pin || "",
        street: data.address || "",
        dob: new Date(data.dateOfBirth).toISOString().split("T")[0] || "",
        experience: data.experince || "",
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
      });

      if (data.photopath) {
        setProfileImage(data.photopath);
      }
    } catch (error) {
      console.error("Error loading user details:", error);
    }
  };

  return (
    <div className="registration-body">
        <div className="registration-container">
        <div className="reg-sidebar">
            <div style={{ position: "relative" }}>
            <img src={profileImage || "/profile-logo.png"} alt="Avatar" id="profile-image" />
            {loading && <div className="loader" id="loader"></div>}
            </div>
            <button type="button" id="upload-btn" onClick={() => document.getElementById("file-input").click()}>
            <i className="fa fa-upload"></i> Upload a photo
            </button>
            <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            />
            <p>
            <i className="fa fa-exclamation-circle" style={{ color: "red" }}></i> Upload a photo
            </p>
        </div>

        <div className="reg-content">
            <div className="logoo">
            <img src="/paid2work-logo.jpeg" alt="Logo" style={{ width: "50%" }} />
            </div>
            <h2 className="title">
            A few last details, then you can check and publish your profile.
            </h2>
            <p className="subtitle">
            A professional photo helps you build trust with your clients. To keep things safe and
            simple, they’ll pay you through us - which is why we need your personal information.
            </p>

            <form id="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                <label htmlFor="country">Country *</label>
                <i className="fa fa-globe"></i>
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                    <option key={country.country_Id} value={country.country_Id}>
                        {country.country_Name}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="dob">Date of Birth *</label>
                <i className="fa fa-calendar-alt"></i>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="street">Street address *</label>
                <i className="fa fa-map-marker-alt"></i>
                <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="apt">Experience Level</label>
                <i className="fa fa-building"></i>
                <select
                    id="apt"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                >
                    <option value="">Select Experience Level</option>
                    {populateExperienceLevels().map((exp) => (
                    <option key={exp.value} value={exp.value}>
                        {exp.label}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="state">State *</label>
                <i className="fa fa-map-marker-alt"></i>
                <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                    <option key={state.state_Id} value={state.state_Id}>
                        {state.state_Name}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="postalCode">Postal code *</label>
                <i className="fa fa-map-marker-alt"></i>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="city">City *</label>
                <i className="fa fa-map-marker-alt"></i>
                <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                    <option key={city.city_Id} value={city.city_Id}>
                        {city.city_Name}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <i className="fa fa-phone-alt"></i>
                <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                />
            </div>
                
            <div class="actions">

                <button type="button" className="back py-1">Back</button>
                <button type="submit" className="btn-primary py-1" disabled={loading}>
                    {loading ? "Updating..." : "Save & Continue"}
                </button>
            </div>

            </form>
        </div>
        </div>
    </div>
  );
};

export default RegistrationDetails;


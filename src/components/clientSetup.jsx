import React, { useState, useEffect } from "react";
import "./clientSetup.css";

function ClientSetup() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [profileImage, setProfileImage] = useState("../pic/profile-logo.png");
  const [userDetails, setUserDetails] = useState({
    phone: "",
    postalCode: "",
    street: "",
    dob: "",
    experience: "",
    city: "",
    state: "",
    country: "",
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    loadCountries();
    const NUserID = sessionStorage.getItem("NUserID");
    if (NUserID) {
      loadUserDetails(NUserID);
    }
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetch("https://freelancerapp.somee.com/GetActiveCountry");
      if (!response.ok) throw new Error("Failed to fetch countries");
      const countries = await response.json();
      setCountries(countries);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (countryId) => {
    try {
      const response = await fetch(`https://freelancerapp.somee.com/GetActiveState?CountryId=${countryId}`);
      if (!response.ok) throw new Error("Failed to fetch states");
      const states = await response.json();
      setStates(states);
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const response = await fetch(`https://freelancerapp.somee.com/GetActiveCity?CountryId=${selectedCountry}&State_Id=${stateId}`);
      if (!response.ok) throw new Error("Failed to fetch cities");
      const cities = await response.json();
      setCities(cities);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a file in JPG, JPEG, or PNG format.");
        return;
      }

      const NUserID = sessionStorage.getItem("NUserID");
      const formData = new FormData();
      formData.append("NUserID", NUserID);
      formData.append("type", "profile");
      formData.append("File", file);

      setLoader(true);
      try {
        const response = await fetch("https://freelancerapp.somee.com/UploadPhoto", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setProfileImage(URL.createObjectURL(file));
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const NUserID = sessionStorage.getItem("NUserID");
    const formData = new FormData();
    formData.append("NUserID", NUserID);
    formData.append("PhoneNumber", userDetails.phone);
    formData.append("City", userDetails.city);
    formData.append("State", userDetails.state);
    formData.append("Pin", userDetails.postalCode);
    formData.append("Address", userDetails.street);
    formData.append("Country", userDetails.country);

    try {
      const response = await fetch("https://freelancerapp.somee.com/Update_About", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
      window.location.href = "Payments.html";
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const loadUserDetails = async (NUserID) => {
    try {
      const response = await fetch(`https://freelancerapp.somee.com/GetUserPersonalDetails?NUserId=${NUserID}`);
      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      setUserDetails({
        phone: data.phoneNumber || "",
        postalCode: data.pin || "",
        street: data.address || "",
        dob: new Date(data.dateOfBirth).toISOString().split("T")[0] || "",
        experience: data.experience || "",
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
      });
      if (data.country) {
        loadStates(data.country);
      }
      if (data.state) {
        loadCities(data.state);
      }
      if (data.photopath) {
        setProfileImage(data.photopath);
      }
    } catch (error) {
      console.error("Error loading user details:", error);
    }
  };

  return (
    <div className="client-setup-container">
        <div className="coontainer">
        <div className="sidebar">
            <div style={{ position: "relative" }}>
            <img src="/paid2work-logo.jpeg" alt="Avatar" id="profile-image" style={{ width: "100%" }}/>
            {loader && <div className="loader" id="loader"></div>}
            </div>
            <button type="button" id="upload-btn" onClick={handleUploadClick}>
            <i className="fa fa-upload"></i> Upload a photo
            </button>
            <input type="file" id="file-input" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
            <p>
            <i className="fa fa-exclamation-circle" style={{ color: "red" }}></i> Upload a photo
            </p>
        </div>
        <div className="content">
            <div className="logo">
            {/* <img src="/paid2work-logo.jpeg" alt="Logo" style={{ width: "50%" }} /> */}
            </div>
            <h2 className="title">A few last details, then you can check and publish your profile.</h2>
            <p className="subtitle">
            A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need
            your personal information.
            </p>
            <form id="profile-form" onSubmit={handleFormSubmit}>
            <div class="form-row">
                    <div class="form-group">
                        <label for="country">Country *</label>
                        <i class="fa fa-globe"></i>
                        <select id="country" name="country" required>
                            <option value="">Select Country</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dob">Company Link *</label>
                        <input type="text" name="dob" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="street">Street address *</label>
                    <i class="fa fa-map-marker-alt"></i>
                    <input type="text" id="street" name="street" required />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="apt">Company Name</label>
                        <i class="fa fa-building"></i>
                        <input type="text" required/>
                    </div>
                    <div class="form-group">
                        <label for="state">State/Province *</label>
                        <i class="fa fa-map"></i>
                        <select id="state" name="state" required>
                            <option value="">Select State</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="city">City *</label>
                        <i class="fa fa-city"></i>
                        <select id="city" name="city" required>
                            <option value="">Select City</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="postal-code">Postal Code</label>
                        <i class="fa fa-envelope"></i>
                        <input type="text" id="postal-code" name="postal-code" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone-container">Phone *</label>
                        <i class="fa fa-phone-alt"></i>
                      
                        <input type="text" id="phone" name="phone" required />
                </div>

                <div class="actions">
                    <button type="button" class="back" onclick="window.history.back()">Back</button>
                    <button type="submit">Save and Continue</button>
                </div>
            </form>
        </div>
        </div>
    </div>
  );
}

export default ClientSetup;

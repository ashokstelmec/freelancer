import React, { useState } from "react";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);

    try {
      const response = await fetch("https://freelancerapp.somee.com/Login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const userData = await response.json();
        
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("skill", userData.skill);
        sessionStorage.setItem("NUserID", userData.nUserID);
        sessionStorage.setItem("progress", userData.progress);
        sessionStorage.setItem("photoPath", userData.photopath);
        sessionStorage.setItem("roleId", userData.roleId);

        const progress = parseFloat(userData.progress);
        const roleId = userData.roleId;

        if (roleId === "1" && progress > 10) {
          window.location.href = "dashboard.html";
        } else if (roleId === "1") {
          window.location.href = "qualification.html";
        } else if (roleId === "0" && progress > 10) {
          window.location.href = "Payments.html";
        } else {
          window.location.href = "ClientSetup.html";
        }
      } else {
        setErrorMessage("Login Failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="App">
      <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
        <div>
          <img src="/paid2work-logo.jpeg" alt="Paid2Work-Logo" style={{ width: "70%" }} />
        </div>
        <h3>Welcome back</h3>
        <button type="button" className="google-btn">
          {/* Google SVG */}
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="LgbsSe-Bz112c"
          >
            <g>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", marginTop: "2rem", fontWeight: "bold" }}>
          <hr />
          OR
          <hr />
        </div>

        <div>
          <br />
          <div>
            <input
              id="emailInput"
              type="text"
              name="Email"
              placeholder="Email or Username"
              style={{ width: "89%", paddingBlock: "0.9rem", paddingInline: "1rem", border: "1px solid #bcc5d3", borderRadius: "4px" }}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              id="passwordInput"
              type="password"
              name="Password"
              placeholder="Password"
              style={{ width: "89%", paddingBlock: "0.9rem", paddingInline: "1rem", border: "1px solid #bcc5d3", borderRadius: "4px" }}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: "2rem" }}>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"> Remember me</label>
            </div>
            <a href="forgot-password.html" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </div>
        <br />
        <br />
        <div className="log-in-button">
          <button type="submit">Log in</button>
        </div>

        {errorMessage && <div id="errorMessage" className="error-message">{errorMessage}</div>}

        <br />
        <div>
          <hr />
          <p style={{ fontSize: "14px" }}>
            Don't have an account? <a href="" className="an-account" style={{ color: "blue", textDecoration: "none" }}>Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

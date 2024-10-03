import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Account.module.css";
import axiosInstance from "../../config/axiosInstance";
import Cookies from "js-cookie";
import { FaGoogle } from "react-icons/fa";

function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("signIn");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      alert("You are already logged in!");
      navigate("/");
    }

    // Check for success message in location state
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setActiveTab("signIn");
    }
  }, [navigate, location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ email: "", password: "", username: "", fullName: "" });
    setAvatar(null);
    setError("");
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError("Avatar file size must be less than 50MB");
        e.target.value = null;
      } else {
        setAvatar(file);
        setError("");
      }
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8000/api/v1/users/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (activeTab === "signIn") {
      await handleSignIn();
    } else {
      await handleSignUp();
    }

    setLoading(false);
  };

  const handleSignIn = async () => {
    try {
      const response = await axiosInstance.post("/v1/users/login", {
        email: formData.email,
        password: formData.password,
      });
      const token = response.data.data.accessToken;
      if (!token) throw new Error("Token not found in response");
      
      Cookies.set("token", token, { path: "/", secure: false, sameSite: "Lax" });
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      // Check for specific error messages and set them
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        handleError(error, "Login failed");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      if (!avatar) {
        throw new Error("Avatar is required");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("avatar", avatar);

      await axiosInstance.post("/v1/users/register", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
        withCredentials: true,
      });

      setSuccessMessage("Signup successful! Please log in.");
      setActiveTab("signIn");
      setFormData({ ...formData, password: "" });
    } catch (error) {
      // Check for specific error messages and set them
      if (error.response && error.response.status === 409) {
        setError("Username or email already exists");
      } else {
        handleError(error, "Signup failed");
      }
    }
  };

  const handleError = (error, defaultMessage) => {
    console.error("Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setError(error.response.data.message || `${defaultMessage}: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      setError("No response received from server. Please try again later.");
    } else {
      // Something happened in setting up the request that triggered an Error
      setError(error.message || defaultMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <img src="/path/to/your/logo.png" alt="We need a designer" />
        </div>
        <h2>Welcome</h2>
        <p>Kolm is here to help businesses in overcoming problems related to slow agencies and unreliable freelancers.</p>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <h1 className={styles.heading}>{activeTab === "signIn" ? "Sign in to Food Express" : "Sign up to Food Express"}</h1>
        <button className={styles.googleButton} onClick={handleGoogleAuth}>
          <FaGoogle /> {activeTab === "signIn" ? "Sign in" : "Sign up"} with Google
        </button>
        <div className={styles.divider}>
          or {activeTab === "signIn" ? "sign in" : "sign up"} with email
        </div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "signIn" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("signIn")}
          >
            Sign In
          </button>
          <button
            className={`${styles.tab} ${activeTab === "signUp" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("signUp")}
          >
            Sign Up
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {activeTab === "signUp" && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username *</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="avatar">Avatar * (Max 50MB)</label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">{activeTab === "signIn" ? "Username or email address *" : "Email address *"}</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {activeTab === "signIn" && (
            <div className={styles.rememberMe}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>
          )}
          {activeTab === "signUp" && (
            <div className={styles.privacyPolicy}>
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
            </div>
          )}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Processing..." : activeTab === "signIn" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        {activeTab === "signIn" && (
          <div className={styles.forgotPassword}>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;

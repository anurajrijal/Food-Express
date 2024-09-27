import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import axiosInstance from "../../config/axiosInstance"; // Axios instance
import Cookies from "js-cookie"; // Import js-cookie

function Account() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      alert("You are already logged in!");
      navigate("/");
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ email: "", password: "", fullName: "", confirmPassword: "" }); // Reset form fields on tab switch
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleGoogleLogin = () => { // Removed async/await
    // Redirect to Google Auth
    window.location.href = 'http://localhost:8000/api/v1/users/auth/google'; // Changed to redirect
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === "signIn") {
        // Sign In request
        const response = await axiosInstance.post("/v1/users/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log("Login response:", response.data);

        const token = response.data.data.accessToken;
        if (!token) {
          throw new Error("Token not found in response");
        }

        alert("Login successful!");

        // Save token in cookies
        Cookies.set("token", token, { secure: false, sameSite: "none" });

        // Navigate to the home page
        navigate("/");
      } else {
        // Sign Up request
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        const response = await axiosInstance.post("/v1/users/signup", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        console.log("Signup response:", response.data);

        const token = response.data.token || response.data.accessToken;
        if (!token) {
          throw new Error("Token not found in response");
        }

        alert("Signup successful!");

        // Save token in cookies
        Cookies.set("token", token, { secure: true, sameSite: "Strict" });

        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error during form submission:",
        error.response?.data || error.message
      );
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.div1}>{/* Content for the left side */}</div>
      <div className={styles.div2}>
        <h1>Account</h1>
        <div className="w-full">
          <div className="relative right-0">
            <ul
              className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
              data-tabs="tabs"
              role="list"
            >
              <li className="z-30 flex-auto text-center">
                <a
                  className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit ${
                    activeTab === "signIn" ? `${styles.underline} active` : ""
                  }`}
                  onClick={() => handleTabClick("signIn")}
                  role="tab"
                  aria-selected={activeTab === "signIn"}
                  aria-controls="signIn"
                >
                  Sign In
                </a>
              </li>
              <li className="z-30 flex-auto text-center">
                <a
                  className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600 bg-inherit ${
                    activeTab === "signUp" ? `${styles.underline} active` : ""
                  }`}
                  onClick={() => handleTabClick("signUp")}
                  role="tab"
                  aria-selected={activeTab === "signUp"}
                  aria-controls="signUp"
                >
                  Sign Up
                </a>
              </li>
            </ul>

            {/* Sign In Form */}
            <div
              data-tab-content=""
              className={`p-5 ${styles.tabContent} ${
                activeTab === "signIn" ? styles.active : ""
              }`}
            >
              <div
                id="signIn"
                role="tabpanel"
                className={activeTab === "signIn" ? "" : "hidden opacity-0"}
              >
                <div className={styles.formContainer}>
                  <button
                    className={styles.loginGoogle}
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </button>

                  {/* Divider with text */}
                  <div className={styles.divider}>
                    <span>or sign in with email</span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="password">Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className={styles.eyeButton}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <label htmlFor="remember" className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        id="remember"
                      />
                      <span className={styles.customCheckbox}></span>
                      Remember Me
                    </label>

                    <label className={styles.forgotPassword}>
                      Forgot Password? Click here
                    </label>
                    <button
                      type="submit"
                      className={styles.loginButton}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sign Up Form */}
            <div
              data-tab-content=""
              className={`p-5 ${styles.tabContent} ${
                activeTab === "signUp" ? styles.active : ""
              }`}
            >
              <div
                id="signUp"
                role="tabpanel"
                className={activeTab === "signUp" ? "" : "hidden opacity-0"}
              >
                <div className={styles.formContainer}>
                  <button className={styles.loginGoogle}>
                    Sign Up with Google
                  </button>

                  {/* Divider with text */}
                  <div className={styles.divider}>
                    <span>or sign up with email</span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="password">Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className={styles.eyeButton}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className={styles.passwordContainer}>
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className={styles.eyeButton}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.loginButton}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Sign Up"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

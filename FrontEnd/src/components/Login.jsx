import React, { useState, useContext } from "react";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { authStyles as styles } from "../assets/dummystyle";
import axiosInstance from "../utils/axiosInstance";
import { Input } from "./Input";
import { validateEmail } from "../utils/helper";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Login logic here
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome to Login</h3>
        <p className={styles.subtitle}>
          Sign in to Continue building your resume
        </p>
      </div>
      {/* form  */}
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          value={email}
          type="text"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />

        <Input
          className={styles}
          type="password"
          label="Password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <button
            className={styles.switchButton}
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

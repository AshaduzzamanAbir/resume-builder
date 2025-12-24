import React, { useContext, useState } from "react";
import { authStyles as styles } from "../assets/dummystyle";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Input } from "./Input";

export const SingUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Plwase enter a valid password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItme("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message) ||
        "Something went wrong, please try again later.";
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>
          Please fill in the information below:
        </p>
      </div>

      {/* Form  */}
      <form onSubmit={handleSignUp} className={styles.form}>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          label="Full Name"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          label="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          label="Password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>
          Sign Up
        </button>

        {/* from footer  */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            className={styles.signupSwitchButton}
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SingUp;

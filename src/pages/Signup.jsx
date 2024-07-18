import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useContextValue } from "../context/AuthProvider";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useContextValue();

  const handelSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      toast.success("Registration Successful.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userId && isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, userId, navigate]);

  return (
    <div className="root-body">
      <div className="auth-container">
        <form className="auth-form">
          <h2 className="auth-title">Sign Up</h2>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button
            onClick={handelSignup}
            type="submit"
            className="auth-button signup-button"
          >
            Sign Up
          </button>
          <div className="auth-option">
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

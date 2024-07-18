import React, { useEffect, useState } from "react";
import "./styles/AuthPages.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";
import { useContextValue } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useContextValue();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Successful.");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid login credentials.");
      });
  };

  useEffect(() => {
    if (userId && isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, userId, navigate]);

  return (
    <div className="root-body">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2 className="auth-title">Login</h2>
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
          <button type="submit" className="auth-button login-button">
            Login
          </button>
          <div className="auth-option">
            <p>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

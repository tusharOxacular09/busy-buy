import React from "react";
import "./Navbar.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useContextValue } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, userId } = useContextValue();

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Successfully Loggged Out.");
      })
      .catch((error) => {
        toast.error("Error While Loggged Out.");
      });
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Busy Buy</div>
        <ul className="nav-links">
          <NavLink
            to={"/"}
            style={({ isActive }) =>
              isActive ? { color: "#ffc107" } : undefined
            }
          >
            <li>Home</li>
          </NavLink>
          {isLoggedIn && userId && (
            <>
              <NavLink
                to={"/orders"}
                style={({ isActive }) =>
                  isActive ? { color: "#ffc107" } : undefined
                }
              >
                <li>Orders</li>
              </NavLink>
              <NavLink
                to={"/carts"}
                style={({ isActive }) =>
                  isActive ? { color: "#ffc107" } : undefined
                }
              >
                <li>Cart</li>
              </NavLink>
            </>
          )}
        </ul>
        <div className="auth-buttons">
          {isLoggedIn && userId ? (
            <button onClick={handelLogout} className="logout-button">
              Logout
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="login-button">Login</button>
              </Link>
              <Link to={"/signup"}>
                <button className="signup-button">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

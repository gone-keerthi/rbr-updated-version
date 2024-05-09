import React, { useContext, useState } from "react";
import "./navbar.css"
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { Store } from "../Store";
import avatar from "../assets/avatar.svg";
import Login from "./Login";
import toast, { Toaster } from "react-hot-toast";

import { auth } from "../Firebase/firebase.js";
import { signOut } from "firebase/auth";

const Navbar = (props) => {
  const { dispatch } = useContext(Store);
  const [phoneNumber, setPhoneNumber] = useState("");

  // State to manage the modal for login
  const [openModel, setOpenModel] = useState(false);
  const [logOut, setLogout] = useState(false);

  // Accessing state from the Store context
  const { state } = useContext(Store);
  const { name, isLogin } = state;

  // Function to handle logout
  function handleLogout() {
    signOut(auth) // Calling the signOut function from firebase auth module
      .then(() => {
        setLogout(true)
        dispatch({ type: "USER_LOGIN", payload: false });
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Error logging out!");
      });
  }
  // console.log(name, Login);
  return (
    <>
      {/* Navbar */}
      <div className="header">
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
          <div className="container-fluid">
            {/* Left side of the navbar */}
            <div className="nav-left">
              <div className="logo">
                <Link to="/" className="navbar-brand">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "60px", height: "60px" }}
                  />
                </Link>
              </div>
              <div className="text">
                <p className="nav-title">Rajan Business Report Services</p>
                <p className="text-desc" style={{ marginTop: "-20px" }}>
                  A product by Rajan Business Ideas
                </p>
              </div>
            </div>
            {/* Navbar toggle button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Right side of the navbar */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                {/* Other navbar items */}

                <li className="nav-item" style={{ marginRight: "80px" }}>
                  <Link
                    to="/about"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    About
                  </Link>
                  <div className={props.about ? "active" : ""}></div>
                </li>
                <li className="nav-item" style={{ marginRight: "80px" }}>
                  <Link to="/" className="nav-link" href="#">
                    Reports
                  </Link>
                  <div className={props.reports ? "active" : ""}></div>
                </li>
                <li className="nav-item" style={{ marginRight: "80px" }}>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>

                  <div className={props.contact ? "active" : ""}></div>
                </li>
                <li className="nav-item">
                  {isLogin && name && (
                    <>
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "5%" }}
                      >
                        <div className="">
                          <p className="user-name">{name}</p>
                        </div>
                        <div className="">
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{ cursor: "pointer" }}
                            onClick={() => setLogout(!logOut)}
                          />
                        </div>
                      </div>
                      {logOut && <button id="logout-btn" onClick={handleLogout}> Logout </button> 
                      // :(
                        // toast.error("failed to logout!")
                      // )
                      }
                      {/* <button id="logout-btn" onClick={handleLogout}> Logout </button> */}
                      {/* {logOut && <div className="logout" onClick={handleLogout}>Logout</div>} */}
                    </>
                  )}
                  {isLogin && !name && (
                    <>
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "10%" }}
                      >
                        <div className="">
                          <p className="user-name">Hello!</p>
                        </div>
                        <div className="">
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{ cursor: "pointer" }}
                            onClick={() => setLogout(!logOut)}
                          />
                        </div>
                      </div>
                      {logOut && <button id="logout-btn" onClick={handleLogout} > Logout </button>}
                      {/* <button id="logout-btn" onClick={handleLogout} > Logout </button> */}
                      {/* {logOut && <div className="logout" style={{
                         background:"#0263c7",
                      }} onClick={handleLogout}>Logout</div>} */}
                    </>
                  )}
                  {!isLogin && (
                    <button
                      className="nav-link login-btn"
                      onClick={() => setOpenModel(true)}
                    >
                      LOGIN
                    </button>
                  )}

                  {/* Conditionally rendering login/logout button
                  {isLogin && name ? (
                    // If user is logged in, display user info and logout button
                    <>
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "5%" }}
                      >
                        <div className="">
                          <p className="user-name">{name}</p>
                        </div>
                        <div className="">
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{ cursor: "pointer" }}
                            onClick={() => setLogout(!logOut)}
                          />
                        </div>
                      </div>
                      {logOut && <div className="logout">Logout</div>}
                    </>
                    // <div className="user-info">
                    //   <p className="user-name">{name}</p>
                    //   <button className="logout-btn" onClick={handleLogout}>
                    //     Logout
                    //   </button>
                      
                    // </div>
                  ) : (
                    // If user is not logged in, display login button
                    <button
                      className="nav-link login-btn"
                      onClick={() => setOpenModel(true)}
                    >
                      LOGIN
                    </button>
                  )} */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Login modal */}
      <Modal
        isOpen={openModel}
        toggle={() => setOpenModel(!openModel)}
        size="lg"
        style={{ maxWidth: "650px", width: "100%", marginTop: "15%" }}
      >
        <ModalBody>
          {/* Render the Login component inside the modal */}
          <Login />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Navbar;

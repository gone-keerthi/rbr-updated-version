import React, { useContext, useState, useEffect } from "react";
import { Store } from "../Store.js";

import toast, { Toaster } from "react-hot-toast";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { auth } from "../Firebase/firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

const Login = () => {
  const { dispatch } = useContext(Store);

  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null); // State to hold recaptchaVerifier

  useEffect(() => {
    // Initialize recaptchaVerifier once when component mounts
    setRecaptchaVerifier(
      new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {},
          "expired-callback": () => {},
        },
        auth
      )
    );
  }, []);

  // const setRecaptchaVerifierOnWindow = async (recaptchaId) => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     recaptchaId,
  //     { size: "invisible" },
  //     auth
  //   );
  //   window.recaptchaWidgetId = await window.recaptchaVerifier.render();
  // };

  useEffect(() => {
    // Clear error message after 5 seconds
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 10000);
    // Clear the timer if the component unmounts or errorMessage changes
    return () => clearTimeout(timer);
  }, [errorMessage]);

  function onSignUp() {
    if (!recaptchaVerifier) {
      console.error("RecaptchaVerifier is not initialized.");
      return;
    }

    const formattedPhoneNumber = "+" + phoneNumber;

    signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTPComponent(true);
      })
      .catch((error) => {
        console.error("Sign-in with phone number error:", error);
        setErrorMessage(error.message.replace("Firebase: ", ""));
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        console.log(result);
        setIsLogin(false);

        dispatch({ type: "SET_PHONE", payload: phoneNumber });
        dispatch({ type: "USER_LOGIN", payload: isLogin });
        // dispatch({ type: "SET_NAME", payload: });

        toast.success("You logged in successfully!");
      })
      .catch((error) => {
        console.error("OTP verification error:", error);
        setErrorMessage(error.message.replace("Firebase: ", ""));
      });
  }

  // function handleLogout() {
  //   signOut(auth) // Calling the signOut function from firebase auth module
  //     .then(() => {
  //       // Reset state and dispatch actions
  //       setPhoneNumber("");
  //       setOtp("");
  //       setShowOTPComponent(false);
  //       setIsLogin(true);
  //       dispatch({ type: "SET_PHONE", payload: "" });
  //       dispatch({ type: "USER_LOGIN", payload: true });
  //       toast.success("Logged out successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Logout error:", error);
  //       toast.error("Error logging out!");
  //     });
  // }

  return (
    <>
      {isLogin ? (
        <>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="Login-component">
            {showOTPComponent ? (
              <div className="login-popup">
                <div className="login-title" style={{ padding: "0 20px" }}>
                  <h3>Please Enter the One Time Password to Login</h3>
                </div>
                <div className="login-paragraph">
                  <p>OTP has been sent </p>
                  <div className="otp-fields">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                    ></OtpInput>
                  </div>
                </div>
                <div>
                  <button className="login-button" onClick={onOTPVerify}>
                    LOGIN
                  </button>
                  <p style={{ color: " #0263C7", marginTop: "15px" }}>
                    RESEND OTP
                  </p>
                  <p
                    style={{ color: "#0263C7" }}
                    onClick={() => setShowOTPComponent(false)}
                  >
                    Entered a Wrong Mobile Number?
                  </p>
                </div>
                {/* display error message if present */}
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>
            ) : (
              <div className="login-popup-container">
                <div className="login-popup">
                  <div className="login-title">
                    <h3>Please Enter Your Mobile Number</h3>
                  </div>
                  <div className="login-paragraph">
                    <p>
                      We will send you a <strong>One Time Password</strong>{" "}
                    </p>
                  </div>
                  <div
                    className="login-phone-input"
                    style={{
                      width: "50%",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PhoneInput
                      style={{ width: "100%" }}
                      country={"in"}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </div>
                  <br></br>
                  <div>
                    <button
                      id="sign-in-button"
                      type="submit"
                      className="login-button"
                      onClick={onSignUp}
                    >
                      SEND OTP
                    </button>
                  </div>
                  {/* display error message if present */}
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <br></br>
                  <div id="recaptcha-container"></div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Login;

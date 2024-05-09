import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Contact.css";
import phone from "../assets/phone.svg";
import email from "../assets/email.svg";
import location from "../assets/location.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
       "https://sampleproject-9957d-default-rtdb.firebaseio.com/ContactUsFormData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Message sent successfully!");
        // Clear the form data after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        console.log(response)
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message");
    }
  };

  return (
    <div>
      <Navbar contact />
      <div className="info-div row">
        <div
          className="phone-div col-md-4 col-sm-6 col-12"
          style={{ textAlign: "center" }}
        >
          <img src={phone} alt="phone" />
          <span>Lets's Talk</span>
          <p>
            <strong>+91 901 479 4288</strong>
          </p>
        </div>
        <div
          className="email-div col-md-4 col-sm-6 col-12"
          style={{ textAlign: "center" }}
        >
          <img src={email} alt="email" />
          <span>Or Email Us</span>
          <p>
            <strong>support@rajanbusinessIdeas.com</strong>
          </p>
        </div>
        <div
          className="location-div col-md-4 col-sm-12 col-12"
          style={{ textAlign: "center" }}
        >
          <img src={location} alt="location" />
          <span>Visit Us</span>
          <p>
            <strong>
              Street number 14, Nagarjuna Nagar, Tarnaka, Secunderabad,
              Telangana
            </strong>
          </p>
        </div>
      </div>
      <div className="row">
        <p className="contact-head mt-4">
          Questions,bug reports,feedback,future requests-we're here for all it
        </p>
      </div>
      <div className="form-div">
        <form>
          <div className="mb-3">
            <label for="email" className="contact-label">
              Your Email Address
            </label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
              id="email"
              style={{ width: "100%" }}
            />
          </div>
          <div className="mb-3">
            <label for="phone" className="contact-label">
              Mobile Number
            </label>
            <p className="number-info">
              (For us to resolve Your issue with fast communication)
            </p>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="contact-input"
              id="phone"
              style={{ width: "100%", marginTop: "-4%" }}
            />
          </div>

          <div className="mb-3">
            <label for="subject" className="contact-label">
              Subject
            </label>
            <br />

            <input
              type="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="contact-input"
              id="subject"
              style={{ width: "100%" }}
            />
          </div>
          <div className="mb-3">
            <label for="message" className="contact-label">
              How can we help?
            </label>
            <br />
            <textarea
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-input"
              id="message"
              style={{ width: "100%" }}
            />
          </div>
          <div className="mb-2">
            <button className="btn  send-btn " style={{ float: "right" }} onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

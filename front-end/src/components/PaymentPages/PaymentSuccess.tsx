import React from "react";
import "../../styles/paymentsuccessful.css";
import Navigation from "../NavigationBar/Navigation.tsx";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
   
  const handleNavigateHome = () => {
    navigate("/")
  }
  return (
    <div>
      <Navigation />
      <div className="payment-successful-container">
        <h1>Payment Successful!</h1>
        <p>Your payment has been processed successfully.</p>
        <p>Thank you for your purchase!</p>
        <button className="back-to-home-button" onClick={() => handleNavigateHome()}>Back to Home</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

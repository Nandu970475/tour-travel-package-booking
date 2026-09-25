import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking || {};

  const {
    title = "Tour",
    name = "",
    phone = "",
    email = "",
    travelDate = "",
    persons = 1,
    pickup = "",
    time = "",
    price = 0,
    travelCharge = 0,
    totalAmount = 0,
  } = booking;

  const packagePrice = price * persons;

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    navigate("/payment-details", {
      state: {
        booking,
        paymentMethod,
      },
    });
  };

  return (
    <div className="payment-page">

      {/* Animated background */}
      <div className="sky">
        <div className="plane plane-one"></div>
        <div className="plane plane-two"></div>
        <div className="plane plane-three"></div>
      </div>

      {/* Main payment box */}
      <div className="payment-container">

        <h1>Select Payment Method</h1>

        {/* Payment methods */}
        <div className="payment-methods">

          <button
            className={paymentMethod === "UPI" ? "active" : ""}
            onClick={() => setPaymentMethod("UPI")}
          >
            UPI Payment
          </button>

          <button
            className={paymentMethod === "Card" ? "active" : ""}
            onClick={() => setPaymentMethod("Card")}
          >
            Credit / Debit Card
          </button>

          <button
            className={
              paymentMethod === "Net Banking" ? "active" : ""
            }
            onClick={() => setPaymentMethod("Net Banking")}
          >
            Net Banking
          </button>

          <button
            className={paymentMethod === "Cash" ? "active" : ""}
            onClick={() => setPaymentMethod("Cash")}
          >
            Cash on Arrival
          </button>

        </div>

        {/* Booking Summary */}
        <div className="booking-summary">

          <h2>Booking Summary</h2>

          <p>
            <strong>Tour :</strong>
            <span>{title}</span>
          </p>

          <p>
            <strong>Name :</strong>
            <span>{name}</span>
          </p>

          <p>
            <strong>Phone :</strong>
            <span>{phone}</span>
          </p>

          <p>
            <strong>Email :</strong>
            <span>{email}</span>
          </p>

          <p>
            <strong>Travel Date :</strong>
            <span>{travelDate}</span>
          </p>

          <p>
            <strong>Travellers :</strong>
            <span>{persons}</span>
          </p>

          <p>
            <strong>Pickup City :</strong>
            <span>{pickup}</span>
          </p>

          <p>
            <strong>Pickup Time :</strong>
            <span>{time}</span>
          </p>

          <hr />

          <h3>
            <span>Package Price :</span>
            <span>₹{packagePrice}</span>
          </h3>

          <h3>
            <span>Travel Charge :</span>
            <span>₹{travelCharge}</span>
          </h3>

          <hr />

          <div className="grand-total">
            <span>Grand Total :</span>
            <span>₹{totalAmount}</span>
          </div>

        </div>

        {/* Continue button */}
        <button
          className="pay-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

        {/* Security text */}
        <p className="secure-text">
          Secure Payment Gateway
        </p>

      </div>

      {/* Bottom runway */}
      <div className="runway"></div>

    </div>
  );
}

export default Payment;
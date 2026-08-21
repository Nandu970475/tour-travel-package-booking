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

      <div className="sky">
        <div className="plane">✈️</div>
        <div className="plane">✈️</div>
        <div className="plane">✈️</div>
      </div>

      <div className="payment-container">

        <h1>Select Payment Method</h1>

        <button
          className={paymentMethod === "UPI" ? "active" : ""}
          onClick={() => setPaymentMethod("UPI")}
        >
          📱 UPI Payment
        </button>

        <button
          className={paymentMethod === "Card" ? "active" : ""}
          onClick={() => setPaymentMethod("Card")}
        >
          💳 Credit / Debit Card
        </button>

        <button
          className={paymentMethod === "Net Banking" ? "active" : ""}
          onClick={() => setPaymentMethod("Net Banking")}
        >
          🏦 Net Banking
        </button>

        <button
          className={paymentMethod === "Cash" ? "active" : ""}
          onClick={() => setPaymentMethod("Cash")}
        >
          💵 Cash on Arrival
        </button>

        <div className="booking-summary">

          <h2>Booking Summary</h2>

          <p><strong>Tour :</strong> {title}</p>

          <p><strong>Name :</strong> {name}</p>

          <p><strong>Phone :</strong> {phone}</p>

          <p><strong>Email :</strong> {email}</p>

          <p><strong>Travel Date :</strong> {travelDate}</p>

          <p><strong>Travellers :</strong> {persons}</p>

          <p><strong>Pickup City :</strong> {pickup}</p>

          <p><strong>Pickup Time :</strong> {time}</p>

          <hr />

          <h3>🏨 Package Price : ₹{packagePrice}</h3>

          <h3>🚖 Travel Charge : ₹{travelCharge}</h3>

          <hr />

          <h2 style={{ color: "green" }}>
            Grand Total : ₹{totalAmount}
          </h2>

        </div>

        <button
          className="pay-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

        <p className="secure-text">
          🔒 Secure Payment Gateway
        </p>

      </div>

      <div className="runway"></div>

    </div>
  );
}

export default Payment;
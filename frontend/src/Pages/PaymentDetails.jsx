import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentDetails.css";

function PaymentDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, paymentMethod } = location.state || {};

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [bank, setBank] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [processing, setProcessing] = useState(false);

  const packagePrice =
    (booking?.price || 0) * (booking?.persons || 1);

  const travelCharge = booking?.travelCharge || 0;

  const grandTotal = booking?.totalAmount || 0;

  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      navigate("/payment-success", {
        state: {
          booking,
          paymentMethod,
        },
      });
    }, 3000);
  };

  return (
    <div className="payment-details-page">
      <div className="payment-card">

        <h1>Payment Details</h1>

        <h2>{paymentMethod}</h2>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>Booking Summary</h3>

          <p>
            <strong>Package :</strong> {booking?.title}
          </p>

          <p>
            <strong>Travellers :</strong> {booking?.persons}
          </p>

          <p>
            <strong>Pickup City :</strong> {booking?.pickup}
          </p>

          <hr />

          <p>
            <strong>🏨 Package Price :</strong> ₹{packagePrice}
          </p>

          <p>
            <strong>🚖 Travel Charge :</strong> ₹{travelCharge}
          </p>

          <hr />

          <h2 style={{ color: "#00ff66" }}>
            Grand Total : ₹{grandTotal}
          </h2>
        </div>

        {paymentMethod === "UPI" && (
          <>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

            <p style={{ color: "#fff" }}>
              Example: name@paytm
            </p>
          </>
        )}

        {paymentMethod === "Card" && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </>
        )}

        {paymentMethod === "Net Banking" && (
          <>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
              <option>Canara Bank</option>
            </select>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {paymentMethod === "Cash" && (
          <>
            <h3>Cash On Arrival</h3>

            <p>
              You can pay the amount when you reach the pickup point.
            </p>
          </>
        )}

        <button
          onClick={handlePay}
          disabled={processing}
        >
          {processing
            ? "Processing Payment..."
            : `Pay ₹${grandTotal}`}
        </button>

      </div>
    </div>
  );
}

export default PaymentDetails;
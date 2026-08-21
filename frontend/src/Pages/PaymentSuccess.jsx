import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, paymentMethod } = location.state || {};

  const hasSaved = useRef(false);

  const bookingId =
    "BK" + Math.floor(100000 + Math.random() * 900000);

  const packagePrice =
    (booking?.price || 0) * (booking?.persons || 1);

  const travelCharge = booking?.travelCharge || 0;

  const grandTotal = booking?.totalAmount || 0;

  useEffect(() => {
    if (!booking || hasSaved.current) return;

    hasSaved.current = true;

    const saveBooking = async () => {
      try {
        await axios.post("${import.meta.env.VITE_API_URL}/api/bookings", {
          ...booking,
          paymentMethod,
          travelCharge,
        });

        console.log("Booking saved successfully");
      } catch (err) {
        console.error("Error saving booking:", err);
      }
    };

    saveBooking();
  }, [booking, paymentMethod, travelCharge]);

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="tick">✅</div>

        <h1>Payment Successful!</h1>

        <p className="thankyou">
          Thank you for booking with us.
        </p>

        <div className="booking-box">

          <h2>Booking Confirmation</h2>

          <hr />

          <p><strong>Booking ID :</strong> {bookingId}</p>

          <p><strong>Package :</strong> {booking?.title}</p>

          <p><strong>Name :</strong> {booking?.name}</p>

          <p><strong>Phone :</strong> {booking?.phone}</p>

          <p><strong>Email :</strong> {booking?.email}</p>

          <p><strong>Travel Date :</strong> {booking?.travelDate}</p>

          <p><strong>Travellers :</strong> {booking?.persons}</p>

          <p><strong>Pickup City :</strong> {booking?.pickup}</p>

          <p><strong>Pickup Time :</strong> {booking?.time}</p>

          <p><strong>Payment Method :</strong> {paymentMethod}</p>

          <hr />

          <h3>🏨 Package Price : ₹{packagePrice}</h3>

          <h3>🚖 Travel Charge : ₹{travelCharge}</h3>

          <hr />

          <h2 style={{ color: "green" }}>
            Grand Total Paid : ₹{grandTotal}
          </h2>

          <hr />

          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Booking Confirmed
          </p>

        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default PaymentSuccess;
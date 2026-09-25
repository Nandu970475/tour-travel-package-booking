import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, paymentMethod } = location.state || {};

  const hasSaved = useRef(false);

  const [bookingId] = useState(
    "BK" + Math.floor(100000 + Math.random() * 900000)
  );

  const packagePrice =
    (booking?.price || 0) * (booking?.persons || 1);

  const travelCharge = booking?.travelCharge || 0;

  const grandTotal = booking?.totalAmount || 0;

  const members = booking?.members || booking?.travellers || [];

  useEffect(() => {
    if (!booking || hasSaved.current) return;

    hasSaved.current = true;

    const saveBooking = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/bookings`,
          {
            ...booking,
            paymentMethod,
            travelCharge,
          }
        );

        console.log("Booking saved successfully");
      } catch (err) {
        console.error("Error saving booking:", err);
      }
    };

    saveBooking();
  }, [booking, paymentMethod, travelCharge]);

  return (
    <div className="success-page">

      <div className="ticket-wrapper">

        {/* Header */}

        <div className="ticket-header">
          <div>
            <span className="ticket-label">DEAL NEST</span>
            <h1>Booking Confirmed</h1>
            <p>Your journey is ready to begin.</p>
          </div>

          <div className="ticket-status">
            <span className="status-dot"></span>
            Confirmed
          </div>
        </div>

        {/* Main Ticket */}

        <div className="travel-ticket">

          <div className="ticket-main">

            <div className="package-title">
              <span>TRAVEL PACKAGE</span>
              <h2>{booking?.title}</h2>
            </div>

            {/* Journey Information */}

            <div className="journey">

              <div className="journey-place">
                <span>FROM</span>
                <strong>{booking?.pickup}</strong>
                <small>Pickup City</small>
              </div>

              <div className="flight-line">
                <div className="line"></div>

                <div className="plane">
                  <svg
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50 8 L58 40 L90 48 L90 55 L59 54
                      L55 92 L48 92 L45 55 L14 55
                      L14 48 L44 40 Z"
                    />
                  </svg>
                </div>

                <div className="line"></div>
              </div>

              <div className="journey-place destination">
                <span>TO</span>
                <strong>{booking?.title}</strong>
                <small>Destination</small>
              </div>

            </div>

            {/* Trip Information */}

            <div className="ticket-info">

              <div>
                <span>TRAVEL DATE</span>
                <strong>{booking?.travelDate}</strong>
              </div>

              <div>
                <span>PICKUP TIME</span>
                <strong>{booking?.time}</strong>
              </div>

              <div>
                <span>TRAVELLERS</span>
                <strong>{booking?.persons}</strong>
              </div>

              <div>
                <span>BOOKING ID</span>
                <strong>{bookingId}</strong>
              </div>

            </div>

            {/* Traveller Names */}

            <div className="traveller-area">

              <div className="traveller-heading">
                <span>TRAVELLERS</span>
                <small>
                  {members.length} passenger
                  {members.length !== 1 ? "s" : ""}
                </small>
              </div>

              <div className="traveller-list">

                {members.length > 0 ? (
                  members.map((member, index) => (
                    <div
                      className="traveller"
                      key={index}
                    >
                      <span className="traveller-number">
                        {index + 1}
                      </span>

                      <strong>{member}</strong>
                    </div>
                  ))
                ) : (
                  <div className="traveller">
                    <span className="traveller-number">1</span>
                    <strong>{booking?.name}</strong>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Price Section */}

          <div className="ticket-price">

            <span className="price-label">
              TOTAL PAID
            </span>

            <div className="price">
              ₹{grandTotal}
            </div>

            <div className="price-details">
              <p>
                Package
                <strong>₹{packagePrice}</strong>
              </p>

              <p>
                Travel Charge
                <strong>₹{travelCharge}</strong>
              </p>

              <p>
                Payment
                <strong>{paymentMethod}</strong>
              </p>
            </div>

            <div className="confirmed-box">
              Booking Confirmed
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="ticket-footer">
          <span>DEAL NEST</span>
          <span>Travel with confidence</span>
          <span>{bookingId}</span>
        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default PaymentSuccess;
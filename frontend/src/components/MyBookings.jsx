import { useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css";
import DealNestMessage from "./DealNestMessage";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // DealNest message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // =====================================================
  // DEALNEST MESSAGE
  // =====================================================

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings`
      );

      // Safer fallback
      setBookings(
        res.data?.data ||
        res.data ||
        []
      );

    } catch (err) {

      console.error(
        "Error fetching bookings:",
        err
      );

      setBookings([]);

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // DOWNLOAD TICKET
  // =====================================================

  const downloadTicket = (bookingId) => {

    if (!bookingId) {
      return;
    }

    window.open(
      `${import.meta.env.VITE_API_URL}/api/ticket/generate/${bookingId}`,
      "_blank"
    );
  };

  // =====================================================
  // CANCEL BOOKING
  // =====================================================

  const cancelBooking = async (id) => {

    const reason = prompt(
      `Why are you cancelling your booking?

1. Change of plans
2. Personal reasons
3. Found a better price
4. Health issues
5. Booked by mistake
6. Travel date doesn't suit me
7. Other (type your reason)`
    );

    if (!reason?.trim()) {
      return;
    }

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/cancel/${id}`,
        {
          reason,
        }
      );

      showMessage(
        "Booking cancelled successfully.",
        "success"
      );

      // Refresh bookings
      fetchBookings();

    } catch (err) {

      console.error(
        "Cancel error:",
        err
      );

      showMessage(
        "Failed to cancel booking.",
        "error"
      );
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="my-bookings">

      {/* DEALNEST MESSAGE */}

      <DealNestMessage
        message={message}
        type={messageType}
      />

      <h2>My Bookings</h2>

      {/* LOADING */}

      {loading ? (

        <p>Loading bookings...</p>

      ) : bookings.length === 0 ? (

        /* NO BOOKINGS */

        <p>No bookings yet.</p>

      ) : (

        /* BOOKING GRID */

        <div className="booking-grid">

          {bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking._id}
            >

              <h3>
                {booking.title ||
                  "Tour Booking"}
              </h3>

              <p>
                <strong>Name:</strong>{" "}
                {booking.name}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.travelDate}
              </p>

              <p>
                <strong>Travellers:</strong>{" "}
                {booking.persons}
              </p>

              <p>
                <strong>Pickup:</strong>{" "}
                {booking.pickup}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {booking.time}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                ₹{booking.totalAmount}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {booking.paymentStatus ||
                  "Pending"}
              </p>

              <p>
                <strong>Status:</strong>{" "}

                {booking.bookingStatus ===
                "Cancelled"

                  ? "❌ Cancelled"

                  : "🟢 Confirmed"}
              </p>

              {/* DOWNLOAD TICKET */}

              {booking.bookingStatus !==
                "Cancelled" && (

                <button
                  className="ticket-btn"
                  onClick={() =>
                    downloadTicket(
                      booking._id
                    )
                  }
                >
                  🎫 Download Ticket
                </button>

              )}

              {/* CANCEL BOOKING */}

              {booking.bookingStatus !==
                "Cancelled" && (

                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelBooking(
                      booking._id
                    )
                  }
                >
                  Cancel Booking
                </button>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyBookings;
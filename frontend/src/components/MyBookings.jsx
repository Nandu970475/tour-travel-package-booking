import { useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/bookings");

      // safer fallback in case backend structure changes
      setBookings(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // 🎫 Download ticket
  const downloadTicket = (bookingId) => {
    if (!bookingId) return;

    window.open(
      `http://localhost:5000/api/ticket/generate/${bookingId}`,
      "_blank"
    );
  };

  // ❌ Cancel booking
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

    if (!reason?.trim()) return;

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/cancel/${id}`,
        { reason }
      );

      alert("Booking cancelled successfully.");

      fetchBookings();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.title || "Tour Booking"}</h3>

              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Date:</strong> {booking.travelDate}</p>
              <p><strong>Travellers:</strong> {booking.persons}</p>
              <p><strong>Pickup:</strong> {booking.pickup}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>

              <p>Payment: {booking.paymentStatus || "Pending"}</p>

              <p>
                Status:{" "}
                {booking.bookingStatus === "Cancelled"
                  ? "❌ Cancelled"
                  : "🟢 Confirmed"}
              </p>

              {/* 🎫 Ticket Button */}
              {booking.bookingStatus !== "Cancelled" && (
                <button
                  className="ticket-btn"
                  onClick={() => downloadTicket(booking._id)}
                >
                  🎫 Download Ticket
                </button>
              )}

              {/* ❌ Cancel Button */}
              {booking.bookingStatus !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelBooking(booking._id)}
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
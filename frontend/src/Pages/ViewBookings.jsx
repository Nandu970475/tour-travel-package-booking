import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewBookings.css";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching bookings");
    }
  };

  return (
    <div className="bookings-container">
      <h1>📋 All Bookings</h1>

      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Tour</th>
              <th>Persons</th>
              <th>Travel Date</th>
              <th>Pickup</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Booked On</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.title}</td>
                  <td>{booking.persons}</td>
                  <td>{booking.travelDate}</td>
                  <td>{booking.pickup}</td>
                  <td>{booking.paymentStatus}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No Bookings Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBookings;
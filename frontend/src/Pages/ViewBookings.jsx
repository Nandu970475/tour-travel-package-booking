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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings`
      );

      setBookings(res.data);
    } catch (err) {
      console.log("Fetch Bookings Error:", err);
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
              <th>Booking Name</th>
              <th>All Traveler Names</th>
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

                  {/* MAIN BOOKING NAME */}
                  <td>
                    {booking.name || "-"}
                  </td>

                  {/* ALL TRAVELER NAMES */}
                  <td>
                    {booking.travelerNames &&
                    booking.travelerNames.length > 0 ? (

                      <div>
                        {booking.travelerNames.map(
                          (traveler, index) => (
                            <div key={index}>
                              {index + 1}. {traveler}
                            </div>
                          )
                        )}
                      </div>

                    ) : (
                      booking.name || "-"
                    )}
                  </td>

                  {/* EMAIL */}
                  <td>
                    {booking.email || "-"}
                  </td>

                  {/* PHONE */}
                  <td>
                    {booking.phone || "-"}
                  </td>

                  {/* TOUR */}
                  <td>
                    {booking.title || "-"}
                  </td>

                  {/* NUMBER OF PERSONS */}
                  <td>
                    {booking.persons || "-"}
                  </td>

                  {/* TRAVEL DATE */}
                  <td>
                    {booking.travelDate || "-"}
                  </td>

                  {/* PICKUP */}
                  <td>
                    {booking.pickup || "-"}
                  </td>

                  {/* PAYMENT */}
                  <td>
                    {booking.paymentStatus || "-"}
                  </td>

                  {/* BOOKING STATUS */}
                  <td>
                    {booking.bookingStatus || "-"}
                  </td>

                  {/* AMOUNT */}
                  <td>
                    ₹{booking.totalAmount || 0}
                  </td>

                  {/* BOOKED DATE */}
                  <td>
                    {booking.createdAt
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="12">
                  No Bookings Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewBookings;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./TourDetails.css";

function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tours/${id}`
      );

      setTour(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!tour) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="tour-details-page">
      <div className="details-card">
        <h1 className="details-title">{tour.title}</h1>

        <div className="details-top">
          <div className="details-image">
            <img src={tour.image} alt={tour.title} />
          </div>

          <div className="details-info">
            <h2>₹ {tour.price}</h2>

            <p>
              <strong>📍 City:</strong> {tour.city}
            </p>

            <p>
              <strong>⭐ Rating:</strong> {tour.rating}
            </p>

            <p>
              <strong>🕒 Duration:</strong> {tour.duration}
            </p>

            <button
              className="details-book-btn"
              onClick={() =>
                navigate("/booking", {
                  state: {
                    city: tour.city,
                    title: tour.title,
                    price: tour.price,
                  },
                })
              }
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="details-section">
          <h3>📝 Description</h3>
          <p>{tour.description}</p>
        </div>

        <div className="details-bottom">
          <div className="details-box">
            <h3>📦 Package Includes</h3>

            <ul>
              <li>🏨 Hotel Accommodation</li>
              <li>🍽 Breakfast & Dinner</li>
              <li>🧑 Professional Tour Guide</li>
              <li>🚌 Local Transportation</li>
              <li>🎫 Entry Tickets Included</li>
              <li>🛡 Travel Insurance</li>
            </ul>
          </div>

          <div className="details-box">
            <h3>📍 Places to Visit</h3>

            <ul>
              {tour.places &&
                tour.places.split(",").map((place, index) => (
                  <li key={index}>{place.trim()}</li>
                ))}
            </ul>
          </div>
        </div>
        <button
    onClick={() => navigate(`/gallery/${tour._id}`)}
>
    📷 View Gallery
</button>

        <div className="details-note">
          💡 Final package price will be calculated based on your selected pickup
          city during booking.
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
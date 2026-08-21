import { useEffect, useState } from "react";
import axios from "axios";

function ViewTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/tours");
      setTours(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        View Tours
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {tours.map((tour) => (
          <div
            key={tour._id}
            style={{
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={tour.image}
              alt={tour.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h2>{tour.title}</h2>

              <p>
                <b>📍 City:</b> {tour.city}
              </p>

              <p>
                <b>🏷 Category:</b> {tour.category}
              </p>

              <p>
                <b>💰 Price:</b> ₹{tour.price}
              </p>

              <p>
                <b>⭐ Rating:</b> {tour.rating}
              </p>

              <p>{tour.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTours;
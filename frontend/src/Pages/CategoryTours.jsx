import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CategoryTours() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTours();
  }, [category]);

  const fetchTours = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tours/category/${decodeURIComponent(
          category
        )}`
      );

      setTours(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async (tourId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/wishlist/add",
        {
          userId: user._id,
          tourId: tourId,
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to add to wishlist");
    }
  };

  // Search Filter
  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(search.toLowerCase()) ||
    tour.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      {/* Banner */}
      <div
        style={{
          background: "#0d6efd",
          color: "white",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1>{decodeURIComponent(category)}</h1>

        <p>
          Explore the best {decodeURIComponent(category)} packages
        </p>

        <button
          onClick={() => navigate("/home")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: "white",
            color: "#0d6efd",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search tours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Tour Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          padding: "40px",
        }}
      >
        {filteredTours.length === 0 ? (
          <h2>No Tours Found</h2>
        ) : (
          filteredTours.map((tour) => (
            <div
              key={tour._id}
              style={{
                width: "300px",
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
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

                <p>📍 {tour.city}</p>

                <p>⭐ {tour.rating || "4.5/5"}</p>

                <p>🕒 {tour.duration || "3 Days"}</p>

                <h3 style={{ color: "green" }}>₹{tour.price}</h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => navigate(`/tour/${tour._id}`)}
                    style={{
                      background: "#0d6efd",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => addToWishlist(tour._id)}
                    style={{
                      background: "#ff4d6d",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ❤️ Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryTours;
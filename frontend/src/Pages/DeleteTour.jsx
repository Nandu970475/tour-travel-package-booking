import { useEffect, useState } from "react";
import axios from "axios";

function DeleteTour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  // Fetch all tours
  const fetchTours = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      setTours(response.data.data);
    } catch (error) {
      console.log("Error fetching tours:", error);
      alert("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  // Delete tour
  const deleteTour = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tours/${id}`
      );

      alert("Tour Deleted Successfully");

      // Remove deleted tour from state
      setTours((prevTours) =>
        prevTours.filter((tour) => tour._id !== id)
      );
    } catch (error) {
      console.log("Delete Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Delete Failed");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading Tours...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Delete Tours</h1>

      {tours.length === 0 ? (
        <h3>No Tours Found</h3>
      ) : (
        tours.map((tour) => (
          <div
            key={tour._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#f9f9f9",
            }}
          >
            <h3>{tour.title}</h3>

            <p>
              <strong>City:</strong> {tour.city}
            </p>

            <p>
              <strong>Category:</strong> {tour.category}
            </p>

            <button
              onClick={() => deleteTour(tour._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteTour;
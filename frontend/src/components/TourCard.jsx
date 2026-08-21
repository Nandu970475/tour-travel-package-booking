import axios from "axios";

function TourCard({ tour }) {

  const handleWishlist = async () => {
    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post("${import.meta.env.VITE_API_URL}/api/wishlist/add", {
        userId: user._id,
        tourId: tour._id,
      });

      alert("❤️ Added to Wishlist");

    } catch (error) {
      console.error(error);
      alert("Failed to add wishlist");
    }
  };

  return (
    <div className="tour-card">
      <img
        src={tour.image}
        alt={tour.title}
        className="tour-image"
      />

      <div className="tour-info">
        <h3>{tour.title}</h3>

        <p>📍 {tour.city}</p>

        <h4>₹{tour.price}</h4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => alert(`Booking for ${tour.title}`)}
          >
            Book Now
          </button>

          <button
            onClick={handleWishlist}
            style={{
              fontSize: "24px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;s
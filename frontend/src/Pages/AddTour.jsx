import { useState } from "react";
import axios from "axios";
import "./AddTour.css";

function AddTour() {
 const [tour, setTour] = useState({
  title: "",
  city: "",
  category: "",
  price: "",
  roomPrice: "",
  foodPrice: "",
  guidePrice: "",
  localTransportPrice: "",
  ticketPrice: "",
  insurancePrice: "",
  duration: "",
  rating: "4.5/5",
  places: "",
  description: "",
  image: "",
  gallery1: "",
  gallery2: "",
  gallery3: "",
  gallery4: "",
});
  const handleChange = (e) => {
    setTour({
      ...tour,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const tourData = {
  ...tour,
  gallery: [
    tour.gallery1,
    tour.gallery2,
    tour.gallery3,
    tour.gallery4,
  ].filter((img) => img !== ""),
};



await axios.post(
  "${import.meta.env.VITE_API_URL}/api/tours/add",
  tourData
);

      alert("✅ Tour Added Successfully!");

      setTour({
        title: "",
        city: "",
        category: "",
        price: "",
        roomPrice: "",
        foodPrice: "",
        guidePrice: "",
        localTransportPrice: "",
        ticketPrice: "",
        insurancePrice: "",
        duration: "",
        rating: "4.5/5",
        places: "",
        description: "",
        image: "",
        gallery1: "",
gallery2: "",
gallery3: "",
gallery4: "",
      });

    } catch (error) {
      console.log(error);
      alert("❌ Error adding tour");
    }
  };

  return (
    <div className="addtour-container">
      <div className="addtour-form">

        <h2>Add New Tour</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Tour Title"
            value={tour.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={tour.city}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={tour.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Hill Stations">🏔️ Hill Stations</option>
            <option value="Spiritual Tours">🛕 Spiritual Tours</option>
            <option value="Honeymoon Tours">❤️ Honeymoon Tours</option>
            <option value="Beach Tours">🏖️ Beach Tours</option>
            <option value="Heritage Tours">🏰 Heritage Tours</option>
            <option value="Nature Tours">🌿 Nature Tours</option>
            <option value="Adventure Tours">🎢 Adventure Tours</option>
            <option value="Family Tours">👨‍👩‍👧 Family Tours</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Package Price"
            value={tour.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="roomPrice"
            placeholder="Room Price"
            value={tour.roomPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="foodPrice"
            placeholder="Food Price"
            value={tour.foodPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="guidePrice"
            placeholder="Guide Price"
            value={tour.guidePrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="localTransportPrice"
            placeholder="Local Transport Price"
            value={tour.localTransportPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={tour.ticketPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="insurancePrice"
            placeholder="Insurance Price"
            value={tour.insurancePrice}
            onChange={handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (Example: 3 Days)"
            value={tour.duration}
            onChange={handleChange}
          />

          <input
            type="text"
            name="rating"
            placeholder="Rating (Example: 4.8/5)"
            value={tour.rating}
            onChange={handleChange}
          />
                    <textarea
            name="places"
            placeholder="Places Covered (Example: Mysore Palace, Chamundi Hills, Brindavan Gardens)"
            value={tour.places}
            onChange={handleChange}
            rows="3"
          />

          <textarea
            name="description"
            placeholder="Tour Description"
            value={tour.description}
            onChange={handleChange}
            rows="5"
          />
<input
  type="text"
  name="image"
  placeholder="Image URL"
  value={tour.image}
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="gallery1"
  placeholder="Gallery Image URL 1"
  value={tour.gallery1}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery2"
  placeholder="Gallery Image URL 2"
  value={tour.gallery2}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery3"
  placeholder="Gallery Image URL 3"
  value={tour.gallery3}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery4"
  placeholder="Gallery Image URL 4"
  value={tour.gallery4}
  onChange={handleChange}
  />

{/* Image Preview */}
{tour.image && (
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <p><strong>Image Preview</strong></p>

              <img
                src={tour.image}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "15px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Tour
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddTour;
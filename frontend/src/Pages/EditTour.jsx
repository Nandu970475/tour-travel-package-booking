import { useEffect, useState } from "react";
import axios from "axios";
import "./EditTour.css";

function EditTour() {
  const [tours, setTours] = useState([]);
  const [editingId, setEditingId] = useState(null);

 const [formData, setFormData] = useState({
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
  description: "",
  image: "",
  rating: "",
  duration: "",
  places: "",
  gallery1: "",
  gallery2: "",
  gallery3: "",
  gallery4: "",
});

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/tours"
      );

      setTours(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (tour) => {
    setEditingId(tour._id);

   setFormData({
  title: tour.title || "",
  city: tour.city || "",
  category: tour.category || "",
  price: tour.price || "",
  roomPrice: tour.roomPrice || "",
  foodPrice: tour.foodPrice || "",
  guidePrice: tour.guidePrice || "",
  localTransportPrice: tour.localTransportPrice || "",
  ticketPrice: tour.ticketPrice || "",
  insurancePrice: tour.insurancePrice || "",
  description: tour.description || "",
  image: tour.image || "",
  rating: tour.rating || "",
  duration: tour.duration || "",
  places: tour.places || "",

  gallery1: tour.gallery?.[0] || "",
  gallery2: tour.gallery?.[1] || "",
  gallery3: tour.gallery?.[2] || "",
  gallery4: tour.gallery?.[3] || "",
});
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  ...rest
} = formData;

const updatedTour = {
  ...rest,
  gallery: [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
  ].filter((img) => img.trim() !== ""),
};

await axios.put(
  `${import.meta.env.VITE_API_URL}/api/tours/${editingId}`,
  updatedTour
);

      alert("✅ Tour Updated Successfully");

      setEditingId(null);

      fetchTours();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="edit-container">

      <h1>Edit Tours</h1>

      <div className="tour-list">

        {tours.map((tour) => (

          <div
            key={tour._id}
            className="tour-card"
          >
            <img
              src={tour.image}
              alt={tour.title}
            />

            <h3>{tour.title}</h3>

            <p>{tour.city}</p>

            <button
              onClick={() => handleEdit(tour)}
            >
              Edit
            </button>

          </div>

        ))}

      </div>
            {editingId && (
        <div
  style={{
    marginTop: "40px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    maxWidth: "1100px",
    margin: "40px auto",
  }}
>
          <h2>Edit Tour</h2>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
>

          <input
            type="text"
            name="title"
            placeholder="Tour Title"
            value={formData.title}
            onChange={handleChange}
          />
         

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
            value={formData.price}
            onChange={handleChange}
          />
        

          <input
            type="number"
            name="roomPrice"
            placeholder="Room Price"
            value={formData.roomPrice}
            onChange={handleChange}
          />
          

          <input
            type="number"
            name="foodPrice"
            placeholder="Food Price"
            value={formData.foodPrice}
            onChange={handleChange}
          />
         

          <input
            type="number"
            name="guidePrice"
            placeholder="Guide Price"
            value={formData.guidePrice}
            onChange={handleChange}
          />
         

          <input
            type="number"
            name="localTransportPrice"
            placeholder="Local Transport Price"
            value={formData.localTransportPrice}
            onChange={handleChange}
          />
          

          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
          

          <input
            type="number"
            name="insurancePrice"
            placeholder="Insurance Price"
            value={formData.insurancePrice}
            onChange={handleChange}
          />
         
</div>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
<input
  type="text"
  name="gallery1"
  placeholder="Gallery Image URL 1"
  value={formData.gallery1}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery2"
  placeholder="Gallery Image URL 2"
  value={formData.gallery2}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery3"
  placeholder="Gallery Image URL 3"
  value={formData.gallery3}
  onChange={handleChange}
/>

<input
  type="text"
  name="gallery4"
  placeholder="Gallery Image URL 4"
  value={formData.gallery4}
  onChange={handleChange}
/>
          

          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{
                width: "250px",
                height: "170px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}

          

          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
          />
         

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
          />
        

          <textarea
            name="places"
            placeholder="Places"
            rows="4"
            value={formData.places}
            onChange={handleChange}
          />

          

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />

        

          <button
            onClick={handleUpdate}
            style={{
              background: "#0d6efd",
              color: "white",
              padding: "12px 30px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Update Tour
          </button>
        </div>
      )}
    </div>
  );
}

export default EditTour;
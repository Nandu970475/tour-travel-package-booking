import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyBookings from "../components/MyBookings";
import Categories from "../components/Categories";
import HeroSlider from "../components/HeroSlider";
function Home() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
 const [search, setSearch] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("All Tours");
 
  useEffect(() => {
    fetchTours();
  }, []);

 const fetchTours = async (searchValue = "") => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tours?search=${searchValue}`
    );

    setTours(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
const handleSearch = () => {
  fetchTours(search);
};
  

  const handleBooking = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    setBookings([...bookings, newBooking]);

    setName("");
    setEmail("");
    setPhone("");
  };

 const deleteBooking = (id) => {
  setBookings(bookings.filter((b) => b.id !== id));
};
const addToWishlist = async (tourId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/wishlist/add",
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

const userName = localStorage.getItem("userName");
const filteredTours =
  selectedCategory === "All Tours"
    ? tours
    : tours.filter(
        (tour) => tour.category === selectedCategory
      );
return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #1e3c72, #2a3e98, #0f2027, #203a43)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
     
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: "#0831ff",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2> DEAL NEST   </h2>
<div>
  <a href="#home" style={{ color: "white", marginRight: "20px" }}>
    Home
  </a>

  <a href="#tours" style={{ color: "white", marginRight: "20px" }}>
    Tours
  </a>
  <Link
  to="/mybookings"
  style={{ color: "white", marginRight: "20px" }}
>
  My Bookings
</Link>
<Link
  to="/wishlist"
  style={{ color: "white", marginRight: "20px" }}
>
  ❤️ Wishlist
</Link>

  
<Link
  to="/contact"
  style={{ color: "white", marginRight: "20px" }}
>
  Contact
</Link>
  <span
    style={{
      color: "white",
      marginRight: "20px",
      fontWeight: "bold",
    }}
  >
    Hello, {userName}
  </span>

  <Link to="/register">
            <button
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
     <HeroSlider />
<section style={{ padding: "40px" }}>
  <h1
    style={{
      color: "white",
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    Explore Tour Categories
  </h1>

  <Categories
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
  />
</section>
    
      {/* WHY CHOOSE US */}
      <section
        style={{
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", marginBottom: "30px" }}>
          Why Choose Us
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <h3>💰 Best Price Guarantee</h3>
            <p>Get the best tour packages at affordable prices.</p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <h3>🔒 Safe & Secure Booking</h3>
            <p>Your booking and payment information is fully protected.</p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <h3>📞 24/7 Customer Support</h3>
            <p>Our team is available anytime to assist your travel needs.</p>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <h3>🌍 Trusted by Thousands of Travelers</h3>
            <p>Thousands of happy customers have traveled with us.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#111",
          color: "white",
          textAlign: "center",
          padding: "15px",
          marginTop: "30px",
        }}
      >
        <p>© 2026 Tour Travel Booking. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
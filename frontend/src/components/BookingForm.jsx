import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingForm.css";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, price } = location.state || {
    title: "Tour",
    price: 0,
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [time, setTime] = useState("");

  const [persons, setPersons] = useState(1);
  const [travellers, setTravellers] = useState([""]);

  // Pickup city charges
 // Pickup city charges
const pickupCharges = {
  // Andhra Pradesh
  Visakhapatnam: 3000,
  Vijayawada: 1500,
  Guntur: 1700,
  Tirupati: 1800,
  Rajahmundry: 2200,
  Kakinada: 2400,
  Nellore: 1900,
  Kurnool: 2300,
  Anantapur: 2600,
  Kadapa: 2200,
  Ongole: 2000,
  Eluru: 1800,
  Srikakulam: 3500,
  Vizianagaram: 3200,
  Machilipatnam: 1700,

  // Telangana
  Hyderabad: 1200,
  Warangal: 2000,
  Karimnagar: 2100,
  Khammam: 1800,
  Nizamabad: 2500,
  Mahabubnagar: 2200,
  Nalgonda: 1700,
  Adilabad: 3200,
  Siddipet: 2000,
  Ramagundam: 2400,
};
  const travelCharge = pickupCharges[pickup] || 0;

  const totalAmount = (price * persons) + travelCharge;

  const handlePersonsChange = (value) => {
    const count = Number(value);

    setPersons(count);

    const updatedTravellers = Array.from(
      { length: count },
      (_, i) => travellers[i] || ""
    );

    setTravellers(updatedTravellers);
  };

  const handleTravellerChange = (index, value) => {
    const updated = [...travellers];
    updated[index] = value;
    setTravellers(updated);
  };

  const handleContinue = () => {
    navigate("/payment", {
      state: {
        booking: {
          title,
          price,
          persons,
          travelCharge,
          totalAmount,
          name,
          phone,
          email,
          travelDate,
          pickup,
          time,
          travellers,
        },
      },
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-card">

        <h1>Booking Details</h1>

        <h2>{title}</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />

        <input
          type="number"
          min="1"
          value={persons}
          onChange={(e) => handlePersonsChange(e.target.value)}
        />

        {travellers.map((traveller, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Traveller ${index + 1} Name`}
            value={traveller}
            onChange={(e) =>
              handleTravellerChange(index, e.target.value)
            }
          />
        ))}

        <select
  value={pickup}
  onChange={(e) => setPickup(e.target.value)}
>
  <option value="">Select Pickup City</option>

  {/* Andhra Pradesh */}
  <option value="Visakhapatnam">Visakhapatnam</option>
  <option value="Vijayawada">Vijayawada</option>
  <option value="Guntur">Guntur</option>
  <option value="Tirupati">Tirupati</option>
  <option value="Rajahmundry">Rajahmundry</option>
  <option value="Kakinada">Kakinada</option>
  <option value="Nellore">Nellore</option>
  <option value="Kurnool">Kurnool</option>
  <option value="Anantapur">Anantapur</option>
  <option value="Kadapa">Kadapa</option>
  <option value="Ongole">Ongole</option>
  <option value="Eluru">Eluru</option>
  <option value="Srikakulam">Srikakulam</option>
  <option value="Vizianagaram">Vizianagaram</option>
  <option value="Machilipatnam">Machilipatnam</option>

  {/* Telangana */}
  <option value="Hyderabad">Hyderabad</option>
  <option value="Warangal">Warangal</option>
  <option value="Karimnagar">Karimnagar</option>
  <option value="Khammam">Khammam</option>
  <option value="Nizamabad">Nizamabad</option>
  <option value="Mahabubnagar">Mahabubnagar</option>
  <option value="Nalgonda">Nalgonda</option>
  <option value="Adilabad">Adilabad</option>
  <option value="Siddipet">Siddipet</option>
  <option value="Ramagundam">Ramagundam</option>
</select>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <hr />

        <h3>Package Price : ₹{price * persons}</h3>

        <h3>Travel Charge : ₹{travelCharge}</h3>

        <h2 style={{ color: "green" }}>
          Grand Total : ₹{totalAmount}
        </h2>

        <button
          className="payment-btn"
          onClick={handleContinue}
        >
          Continue to Payment
        </button>

      </div>
    </div>
  );
}

export default BookingForm;
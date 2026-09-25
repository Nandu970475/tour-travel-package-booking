import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingForm.css";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, price } = location.state || {
    title: "Tour Package",
    price: 0,
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState(1);
  const [members, setMembers] = useState([""]);

  const totalAmount = price * persons;

  const handlePersonsChange = (e) => {
    const count = Number(e.target.value);

    setPersons(count);

    setMembers((oldMembers) =>
      Array.from(
        { length: count },
        (_, index) => oldMembers[index] || ""
      )
    );
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const handleContinue = () => {
    if (
      !name ||
      !phone ||
      !email ||
      !travelDate ||
      !pickup ||
      !time
    ) {
      alert("Please fill all booking details.");
      return;
    }

    if (members.some((member) => !member.trim())) {
      alert("Please enter the name of every traveller.");
      return;
    }

    navigate("/payment", {
      state: {
        booking: {
          title,
          price,
          persons,
          travelCharge: 0,
          totalAmount,
          name,
          phone,
          email,
          travelDate,
          pickup,
          time,
          members,
        },
      },
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-card">

        <div className="booking-header">
          <span>Travel Booking</span>
          <h1>Complete Your Booking</h1>
          <p>Please enter your details to continue</p>
        </div>

        <div className="package-box">
          <p>Selected Package</p>
          <h2>{title}</h2>
          <strong>₹{price} per person</strong>
        </div>

        <div className="form-section">
          <h3>Contact Details</h3>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Trip Details</h3>

          <div className="input-row">
            <div className="input-group">
              <label>Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Pickup Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Pickup City</label>
              <input
                type="text"
                placeholder="Enter your pickup city"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Number of Travellers</label>
              <input
                type="number"
                min="1"
                max="20"
                value={persons}
                onChange={handlePersonsChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section traveller-section">
          <h3>Traveller Details</h3>
          <p className="section-note">
            Enter the name of each person travelling.
          </p>

          <div className="member-grid">
            {members.map((member, index) => (
              <div className="member-box" key={index}>
                <label>Traveller {index + 1}</label>
                <input
                  type="text"
                  placeholder={`Enter traveller ${index + 1} name`}
                  value={member}
                  onChange={(e) =>
                    handleMemberChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <div className="summary-line">
            <span>Package Price</span>
            <span>₹{price}</span>
          </div>

          <div className="summary-line">
            <span>Travellers</span>
            <span>{persons}</span>
          </div>

          <div className="summary-line total-line">
            <span>Total Amount</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>

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
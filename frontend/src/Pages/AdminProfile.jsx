import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

function AdminProfile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Administrator",
    email: "admin@dealnest.com",
    phone: "9876543210",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="admin-profile-page">

      {/* TOP BAR */}
      <div className="profile-topbar">

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/admindashboard")}
        >
          ← Dashboard
        </button>

        <button
          className="logout-profile-btn"
          onClick={() => navigate("/admin")}
        >
          Logout
        </button>

      </div>

      {/* PROFILE CARD */}
      <div className="admin-profile-card">

        {/* PROFILE IMAGE */}
        <div className="profile-avatar">
          👤
        </div>

        <h1>Admin Profile</h1>

        <p className="profile-subtitle">
          Manage your DealNest administrator account
        </p>

        {/* PROFILE DETAILS */}
        <div className="profile-details">

          {/* NAME */}
          <div className="profile-field">

            <label>👤 Name</label>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
              />
            ) : (
              <p>{admin.name}</p>
            )}

          </div>

          {/* EMAIL */}
          <div className="profile-field">

            <label>📧 Email</label>

            {isEditing ? (
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
              />
            ) : (
              <p>{admin.email}</p>
            )}

          </div>

          {/* PHONE */}
          <div className="profile-field">

            <label>📱 Phone Number</label>

            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{admin.phone}</p>
            )}

          </div>

          {/* ROLE */}
          <div className="profile-field">

            <label>🔐 Role</label>

            <p>Administrator</p>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="profile-buttons">

          {isEditing ? (

            <>
              <button
                className="save-profile-btn"
                onClick={handleSave}
              >
                💾 Save Changes
              </button>

              <button
                className="cancel-profile-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>

          ) : (

            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>

          )}

        </div>

        {/* CHANGE PASSWORD */}
        <button
          className="change-password-btn"
          onClick={() => alert("Change Password option")}
        >
          🔑 Change Password
        </button>

      </div>

    </div>
  );
}

export default AdminProfile;
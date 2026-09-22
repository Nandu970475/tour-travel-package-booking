import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">

      {/* TOP RIGHT PROFILE */}
      <button
        className="profile-btn"
        onClick={() => navigate("/adminprofile")}
      >
        👤 Profile
      </button>

      {/* DASHBOARD TITLE */}
      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-grid">

        {/* Add Tour */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/addtour")}
        >
          <h3>➕ Add Tour</h3>
          <p>Add new tour packages</p>
        </div>

        {/* View Tours */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/viewtours")}
        >
          <h3>📋 View Tours</h3>
          <p>Manage available tours</p>
        </div>

        {/* Edit Tour */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/edittour")}
        >
          <h3>✏️ Edit Tour</h3>
          <p>Update tour details</p>
        </div>

        {/* Delete Tour */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/deletetour")}
        >
          <h3>🗑️ Delete Tour</h3>
          <p>Remove tour packages</p>
        </div>

        {/* View Bookings */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/bookings")}
        >
          <h3>📖 View Bookings</h3>
          <p>Check customer bookings</p>
        </div>

        {/* Registered Users */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/users")}
        >
          <h3>👥 Registered Users</h3>
          <p>View all users</p>
        </div>

      </div>

      {/* LOGOUT */}
      <button
        className="logout-btn"
        onClick={() => navigate("/admin")}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;
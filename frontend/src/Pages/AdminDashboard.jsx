import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/addtour")}
        >
          <h3>➕ Add Tour</h3>
          <p>Add new tour packages</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/viewtours")}
        >
          <h3>📋 View Tours</h3>
          <p>Manage available tours</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/edittour")}
        >
          <h3>✏️ Edit Tour</h3>
          <p>Update tour details</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/deletetour")}
        >
          <h3>🗑️ Delete Tour</h3>
          <p>Remove tour packages</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/bookings")}
        >
          <h3>📖 View Bookings</h3>
          <p>Check customer bookings</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/users")}
        >
          <h3>👥 Registered Users</h3>
          <p>View all users</p>
        </div>

      </div>

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
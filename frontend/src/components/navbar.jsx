import { Link } from "react-router-dom";

function Navbar() {
  const userName = localStorage.getItem("userName");

  return (
    <nav className="navbar">
      <h2>🌍 Tour Travel</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/tours">Tours</Link>
        </li>
    <li>
  <Link to="/mybookings">My Bookings</Link>
</li>
     <li>
  <Link to="/wishlist">❤️ Wishlist</Link>
</li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          Hello, {userName}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
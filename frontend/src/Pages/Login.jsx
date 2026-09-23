import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";
import DealNestMessage from "../components/DealNestMessage";

function Login() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // DealNest message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // =====================================================
  // DEALNEST MESSAGE
  // =====================================================

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showMessage("Please enter your email", "error");
      return;
    }

    if (!password.trim()) {
      showMessage("Please enter your password", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email: email.trim(),
          password: password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success && response.data.user) {

        // Save complete user information
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // Save user's name for Navbar
        localStorage.setItem(
          "userName",
          response.data.user.name
        );

        showMessage("Login Successful!", "success");

        // Small delay so user can see the message
        setTimeout(() => {
          navigate("/home");
        }, 1200);

      } else {

        showMessage(
          response.data.message || "Login failed",
          "error"
        );
      }

    } catch (error) {

      console.error("Login error:", error);

      showMessage(
        error.response?.data?.message ||
        "Invalid email or password",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="login-container">

      {/* DEALNEST MESSAGE */}

      <DealNestMessage
        message={message}
        type={messageType}
      />

      {/* LOGIN CARD */}

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* REGISTER */}

        <p>
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/register")}
            style={{
              cursor: "pointer",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Register
          </span>
        </p>

      </div>

      {/* LOGO */}

      <div className="login-logo">

        <img
          src={logo}
          alt="DealNest Logo"
        />

      </div>

    </div>
  );
}

export default Login;
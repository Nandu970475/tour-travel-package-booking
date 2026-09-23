import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import DealNestMessage from "../components/DealNestMessage";

function Register() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  // REGISTER
  // =====================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showMessage("Please enter your name", "error");
      return;
    }

    if (!email.trim()) {
      showMessage("Please enter your email", "error");
      return;
    }

    if (!phone.trim()) {
      showMessage("Please enter your phone number", "error");
      return;
    }

    if (!password.trim()) {
      showMessage("Please enter your password", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password,
        }
      );

      console.log(
        "Register response:",
        response.data
      );

      showMessage(
        "Registered Successfully!",
        "success"
      );

      // Clear fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      // Go to home after message
      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
        "Registration Failed",
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
    <div className="register-container">

      {/* DEALNEST MESSAGE */}

      <DealNestMessage
        message={message}
        type={messageType}
      />

      {/* REGISTER FORM */}

      <div className="register-form">

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          {/* NAME */}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PHONE */}

          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
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

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        {/* LOGIN */}

        <p>
          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            style={{
              cursor: "pointer",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;
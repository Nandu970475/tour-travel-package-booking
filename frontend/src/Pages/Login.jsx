import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

function Login() {

  const navigate = useNavigate();


  // =====================================================
  // STATES
  // =====================================================

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);


  // =====================================================
  // OTP TIMER
  // =====================================================

  useEffect(() => {

    if (timer <= 0) {
      return;
    }


    const interval = setInterval(() => {

      setTimer((previousTimer) => {

        if (previousTimer <= 1) {

          clearInterval(interval);

          return 0;
        }

        return previousTimer - 1;

      });

    }, 1000);


    return () => clearInterval(interval);

  }, [timer]);


  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOTP = async () => {

    // Check email
    if (!email.trim()) {

      alert("Please enter your email");

      return;
    }


    // Check phone
    if (!phone.trim()) {

      alert("Please enter your phone number");

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/users/send-otp`,

        {
          email: email.trim(),
          phone: phone.trim(),
        }

      );


      if (response.data.success) {

        // Show OTP in demo mode
        alert(
          "OTP sent successfully! ✅\n\n" +
          "Your Demo OTP is: " +
          response.data.demoOtp +
          "\n\n" +
          "OTP is valid for 60 seconds."
        );


        // Show OTP page
        setOtpSent(true);


        // Start timer
        setTimer(60);


        // Clear old OTP
        setOtp("");

      }


    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Unable to send OTP"

      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOTP = async () => {

    if (!otp.trim()) {

      alert("Please enter the OTP");

      return;

    }


    if (otp.length !== 6) {

      alert("OTP must contain 6 digits");

      return;

    }


    try {

      setLoading(true);


      const response = await axios.post(

        "${import.meta.env.VITE_API_URL}/api/users/verify-otp",

        {
          email: email.trim(),
          phone: phone.trim(),
          otp: otp.trim(),
        }

      );


      if (response.data.success) {

        // Save user information
        localStorage.setItem(

          "user",

          JSON.stringify(response.data.user)

        );


        alert("Login Successful! ✅");


        // Go to home page
        navigate("/home");

      }


    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Invalid OTP"

      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOTP = async () => {

    if (timer > 0) {

      return;

    }


    await handleSendOTP();

  };


  // =====================================================
  // CHANGE EMAIL / PHONE
  // =====================================================

  const handleChangeDetails = () => {

    setOtpSent(false);

    setOtp("");

    setTimer(0);

  };


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="login-container">


      {/* ============================= */}
      {/* LOGIN CARD */}
      {/* ============================= */}

      <div className="login-card">


        {/* TITLE */}

        <h2>

          {otpSent
            ? "Verify OTP"
            : "Login"}

        </h2>


        {/* ============================= */}
        {/* STEP 1 - EMAIL + PHONE */}
        {/* ============================= */}

        {!otpSent && (

          <>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />


            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />


            <button
              onClick={handleSendOTP}
              disabled={loading}
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>

          </>

        )}


        {/* ============================= */}
        {/* STEP 2 - OTP */}
        {/* ============================= */}

        {otpSent && (

          <>

            <p className="otp-message">

              OTP has been generated for

              <br />

              <strong>{phone}</strong>

            </p>


            {/* OTP INPUT */}

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => {

                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setOtp(value);

              }}
              className="otp-input"
            />


            {/* VERIFY BUTTON */}

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
            >

              {loading
                ? "Verifying..."
                : "Verify OTP & Login"}

            </button>


            {/* TIMER */}

            {timer > 0 && (

              <p className="otp-timer">

                Resend OTP in{" "}

                <strong>
                  {timer}
                </strong>{" "}

                seconds

              </p>

            )}


            {/* RESEND */}

            {timer === 0 && (

              <button
                className="resend-button"
                onClick={handleResendOTP}
                disabled={loading}
              >

                Resend OTP

              </button>

            )}


            {/* CHANGE DETAILS */}

            <button
              className="back-button"
              onClick={handleChangeDetails}
            >

              Change Email / Phone

            </button>

          </>

        )}

      </div>


      {/* ============================= */}
      {/* LOGO */}
      {/* ============================= */}

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
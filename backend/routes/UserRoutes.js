const express = require("express");
const router = express.Router();
const User = require("../models/User");

// =====================================================
// REGISTER USER
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone: phone || "",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =====================================================
// GET ALL USERS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =====================================================
// DELETE USER
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =====================================================
// SEND OTP
// ANY EMAIL + ANY PHONE NUMBER
// =====================================================

router.post("/send-otp", async (req, res) => {
  try {

    const { email, phone } = req.body;

    // Check only that fields are entered
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and phone number",
      });
    }


    // Generate random 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    // OTP expires after 60 seconds
    const otpExpires = Date.now() + 60 * 1000;


    // Create OTP storage
    global.otpStore = global.otpStore || {};


    // Unique key for this email + phone combination
    const key = `${email}_${phone}`;


    // Store OTP temporarily
    global.otpStore[key] = {
      otp: otp,
      expires: otpExpires,
    };


    // Show OTP in backend terminal
    console.log("");
    console.log("======================================");
    console.log("          DEALNEST OTP");
    console.log("======================================");
    console.log("Email       :", email);
    console.log("Phone       :", phone);
    console.log("OTP         :", otp);
    console.log("Valid For   : 60 seconds");
    console.log("======================================");
    console.log("");


    // Send response
    // DEMO MODE - OTP is returned
    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      demoOtp: otp,
    });

  } catch (error) {

    console.error("Send OTP Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
});


// =====================================================
// VERIFY OTP
// =====================================================

router.post("/verify-otp", async (req, res) => {

  try {

    const { email, phone, otp } = req.body;


    // Check input
    if (!email || !phone || !otp) {

      return res.status(400).json({
        success: false,
        message: "Email, phone number and OTP are required",
      });

    }


    global.otpStore = global.otpStore || {};


    // Same key used when OTP was generated
    const key = `${email}_${phone}`;


    const storedOTP = global.otpStore[key];


    // OTP doesn't exist
    if (!storedOTP) {

      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP",
      });

    }


    // Check expiry
    if (Date.now() > storedOTP.expires) {

      delete global.otpStore[key];

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP",
      });

    }


    // Check OTP
    if (storedOTP.otp !== otp) {

      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });

    }


    // OTP is correct
    delete global.otpStore[key];


    // Create login user
    const user = {
      email: email,
      phone: phone,
    };


    console.log("");
    console.log("======================================");
    console.log("        OTP VERIFIED SUCCESSFULLY");
    console.log("======================================");
    console.log("Email :", email);
    console.log("Phone :", phone);
    console.log("======================================");
    console.log("");


    res.status(200).json({

      success: true,

      message: "OTP verified successfully",

      user: user,

    });


  } catch (error) {

    console.error("Verify OTP Error:", error);

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });

  }

});


// =====================================================
// OLD PASSWORD LOGIN
// KEPT SO OTHER PARTS OF YOUR PROJECT DON'T BREAK
// =====================================================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }


    if (user.password !== password) {

      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    }


    res.status(200).json({

      success: true,

      message: "Login Successful",

      user,

    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


module.exports = router;
function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "80%",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <h1>🌳 Help </h1>

        <h3>How can we help you?</h3>

        <p>✈️ Tour booking issues</p>
        <p>💳 Payment problems</p>
        <p>📅 Tour cancellation requests</p>
        <p>💰 Refund status</p>
        <p>❓ General enquiries</p>

        <hr />

        <h3>Contact Support</h3>

        <p>📧 24162121014@gnu.ac.in</p>
        <p>📞 +91 9704758574</p>
      </div>
    </div>
  );
}

export default Contact;
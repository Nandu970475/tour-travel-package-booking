const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const Booking = require("../models/Booking");

const generateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("👉 Ticket Request ID:", id);

    // ✅ Get correct booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ Create PDF
    const doc = new PDFDocument();

    // ✅ Send PDF directly to browser (NO file saving)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${booking._id}.pdf`
    );

    doc.pipe(res);

    // ✅ QR Code
    const qrData = await QRCode.toDataURL(
      `BookingID: ${booking._id}`
    );

    // 🎫 Ticket Content
    doc.fontSize(20).text("🎟 TOUR TICKET", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Name: ${booking.name}`);
    doc.text(`Tour: ${booking.title}`);
    doc.text(`Date: ${booking.travelDate}`);
    doc.text(`Persons: ${booking.persons}`);
    doc.text(`Pickup: ${booking.pickup}`);
    doc.text(`Time: ${booking.time || "N/A"}`);

    doc.moveDown();

    doc.text(`Amount: ₹${booking.totalAmount}`);
    doc.text(`Payment: ${booking.paymentStatus}`);
    doc.text(`Booking Status: ${booking.bookingStatus}`);
    doc.text(`Booking ID: ${booking._id}`);

    doc.moveDown();

    // ✅ Add QR Code
    doc.image(qrData, {
      fit: [120, 120],
      align: "center",
    });

    // ✅ End PDF
    doc.end();

  } catch (err) {
    console.error("Ticket Error:", err);
    res.status(500).json({ message: "Ticket generation failed" });
  }
};

module.exports = { generateTicket };
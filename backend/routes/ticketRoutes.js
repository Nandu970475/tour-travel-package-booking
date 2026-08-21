const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const PDFDocument = require("pdfkit");

// 🎫 Generate Ticket
router.get("/generate/:id", async (req, res) => {
  try {
    console.log("👉 RECEIVED BOOKING ID:", req.params.id);

    const booking = await Booking.findById(req.params.id);

    console.log("🎯 SELECTED BOOKING:", booking);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ============================================
    // CREATE PDF
    // ============================================

    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${booking._id}.pdf`
    );

    doc.pipe(res);

    // ============================================
    // COLORS
    // ============================================

    const navy = "#073B70";
    const blue = "#0B5EA8";
    const lightBlue = "#EAF4FF";
    const green = "#16A34A";
    const lightGreen = "#DCFCE7";
    const dark = "#1F2937";
    const gray = "#6B7280";
    const lightGray = "#F5F7FA";
    const border = "#D7E2EF";
    const white = "#FFFFFF";

    // ============================================
    // HEADER
    // ============================================

    doc.rect(0, 0, 595, 145).fill(navy);

    // Decorative circles
    doc.circle(48, 38, 20).fill(blue);
    doc.circle(547, 38, 20).fill(blue);

    // Airplane symbol
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor(white)
      .text("✈", 38, 26);

    // Main title
    doc
      .font("Helvetica-Bold")
      .fontSize(28)
      .fillColor(white)
      .text("TRAVEL TICKET", 0, 38, {
        align: "center",
        width: 595,
      });

    // Subtitle
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#DCEBFA")
      .text("EXPLORE  •  DISCOVER  •  TRAVEL", 0, 80, {
        align: "center",
        width: 595,
      });

    // Decorative line
    doc
      .moveTo(180, 103)
      .lineTo(415, 103)
      .strokeColor("#FFFFFF")
      .lineWidth(1)
      .stroke();

    doc
      .fontSize(12)
      .fillColor(white)
      .text("✦   ✦   ✦", 0, 108, {
        align: "center",
        width: 595,
      });

    // ============================================
    // MAIN TICKET CONTAINER
    // ============================================

    doc
      .roundedRect(40, 170, 515, 525, 12)
      .fillColor(white)
      .fill();

    doc
      .roundedRect(40, 170, 515, 525, 12)
      .lineWidth(1)
      .strokeColor(border)
      .stroke();

    // ============================================
    // TOUR TITLE
    // ============================================

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor(navy)
      .text(booking.title || "Tour Package", 65, 195, {
        width: 465,
      });

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(gray)
      .text("BOOKING CONFIRMATION", 65, 220);

    // ============================================
    // CUSTOMER DETAILS BOX
    // ============================================

    doc
      .roundedRect(65, 250, 465, 105, 8)
      .fillColor(lightBlue)
      .fill();

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(navy)
      .text("CUSTOMER DETAILS", 85, 270);

    // Name
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(gray)
      .text("NAME", 85, 300);

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(dark)
      .text(booking.name || "-", 150, 300);

    // Email
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(gray)
      .text("EMAIL", 85, 325);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(dark)
      .text(booking.email || "-", 150, 325, {
        width: 180,
      });

    // Phone
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(gray)
      .text("PHONE", 350, 300);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(dark)
      .text(booking.phone || "-", 395, 300);

    // ============================================
    // TRIP DETAILS
    // ============================================

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(navy)
      .text("TRIP DETAILS", 65, 380);

    // Divider
    doc
      .moveTo(65, 400)
      .lineTo(530, 400)
      .strokeColor(border)
      .lineWidth(1)
      .stroke();

    // Travel Date
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("TRAVEL DATE", 65, 420);

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(dark)
      .text(booking.travelDate || "-", 65, 440);

    // Persons
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("PERSONS", 230, 420);

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(dark)
      .text(String(booking.persons || 1), 230, 440);

    // Time
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("TIME", 390, 420);

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor(dark)
      .text(booking.time || "N/A", 390, 440);

    // ============================================
    // PICKUP LOCATION
    // ============================================

    doc
      .roundedRect(65, 475, 465, 65, 8)
      .fillColor(lightGray)
      .fill();

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("PICKUP LOCATION", 85, 492);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor(navy)
      .text(booking.pickup || "-", 85, 512);

    // ============================================
    // PAYMENT BOX
    // ============================================

    doc
      .roundedRect(65, 565, 465, 90, 10)
      .fillColor("#F1F7FF")
      .fill();

    // Amount title
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("TOTAL AMOUNT", 90, 585);

    // Amount
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor(navy)
      .text(`Rs. ${booking.totalAmount || 0}`, 90, 605);

    // Vertical divider
    doc
      .moveTo(315, 580)
      .lineTo(315, 640)
      .strokeColor(border)
      .lineWidth(1)
      .stroke();

    // Payment title
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(gray)
      .text("PAYMENT STATUS", 345, 585);

    // Paid badge
    const paymentStatus = booking.paymentStatus || "Pending";

    if (paymentStatus.toLowerCase() === "paid") {
      doc
        .roundedRect(345, 605, 100, 28, 14)
        .fillColor(lightGreen)
        .fill();

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(green)
        .text("✓ PAID", 365, 613);
    } else {
      doc
        .roundedRect(345, 605, 110, 28, 14)
        .fillColor("#FEF3C7")
        .fill();

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#B45309")
        .text(paymentStatus.toUpperCase(), 355, 613);
    }

    // ============================================
    // FOOTER
    // ============================================

    doc
      .rect(0, 720, 595, 122)
      .fill(navy);

    // Footer airplane
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor(white)
      .text("✈", 85, 750);

    // Footer message
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor(white)
      .text("THANK YOU FOR CHOOSING US!", 0, 750, {
        align: "center",
        width: 595,
      });

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#DCEBFA")
      .text("Have a safe and wonderful journey!", 0, 775, {
        align: "center",
        width: 595,
      });

    // Footer line
    doc
      .moveTo(170, 800)
      .lineTo(425, 800)
      .strokeColor("#7FB3E4")
      .lineWidth(1)
      .stroke();

    // Company
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#BFD8EF")
      .text("DealNest • Tour & Travel Package System", 0, 815, {
        align: "center",
        width: 595,
      });

    // ============================================
    // FINISH
    // ============================================

    doc.end();

  } catch (err) {
    console.log("❌ TICKET ERROR:", err);

    res.status(500).json({
      message: "Ticket error",
    });
  }
});

module.exports = router;
import clientPromise from "../../lib/mongodb";
import nodemailer from "nodemailer";
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, pickup, dropoff } = req.body;
  if (!name || !email || !phone || !pickup || !dropoff) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB || "skylink");
    const col = db.collection("bookings");

    const booking = {
      name,
      email,
      phone,
      pickup,
      dropoff,
      createdAt: new Date()
    };

    await col.insertOne(booking);

    // Email setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"SkyLink Transfers" <${process.env.SMTP_USER}>`,
      to: process.env.BOOKINGS_EMAIL,
      subject: "New Booking",
      text: `Booking: ${JSON.stringify(booking, null, 2)}`
    });

    await transporter.sendMail({
      from: `"SkyLink Transfers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Booking is Confirmed",
      text: `Thanks ${name}, we have your booking from ${pickup} to ${dropoff}.`
    });

    // Twilio SMS
    const clientTwilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    await clientTwilio.messages.create({
      body: `SkyLink Transfers: Hi ${name}, we’ve received your booking from ${pickup} to ${dropoff}.`,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


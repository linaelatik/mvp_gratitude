require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory data structure: { email: { items: [..], lastSentIndex: 0 } }
let usersData = {};

// 1. Route to accept gratitude data
app.post("/api/gratitude", (req, res) => {
  const { email, items } = req.body;

  if (!email || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // Save user data in memory (for production, you'd use a real DB)
  usersData[email] = {
    items,
  };

  console.log(`User data saved for email: ${email}`);
  return res.status(200).json({ message: "Data saved successfully" });
});

// 2. Nodemailer transporter
// In production, you'd likely use environment variables
// or a third-party email service like SendGrid, Mailgun, etc.
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 3. Cron job - run once a day at 9 AM (server time)
cron.schedule("0 9 * * *", async () => {
  console.log("Running daily email job...");

  // For each user, pick a random gratitude item and send an email
  for (let email in usersData) {
    const { items } = usersData[email];

    if (items && items.length > 0) {
      // Pick a random item
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];

      try {
        await sendGratitudeEmail(email, randomItem);
        console.log(`Email sent to ${email}: ${randomItem}`);
      } catch (error) {
        console.error(`Failed to send email to ${email}: `, error);
      }
    }
  }
});

// 4. Function to send the email
async function sendGratitudeEmail(recipient, item) {
  const mailOptions = {
    from: "linaatik2@gmail.com",
    to: recipient,
    subject: "Your Daily Gratitude Reminder",
    text: `Remember to be grateful for: "${item}" today!`,
  };

  // Send the email
  return transporter.sendMail(mailOptions);
}

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

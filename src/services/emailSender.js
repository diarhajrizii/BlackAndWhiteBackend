const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("Please set EMAIL_USER and EMAIL_PASS environment variables.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const name = "Hajriz Hajrizi";
  const dueDate = "11.12.2025";

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
    html: `
  <html>
      <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="background-color:#000;color:#fff;padding:20px;text-align:center;">
            <h1 style="margin:0;font-size:24px;">Rent Payment Reminder</h1>
          </div>
          <div style="padding:30px;">
            <p style="font-size:18px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size:16px;line-height:1.6;">
              We hope you're doing well! This is a friendly reminder that your rent payment is due by <strong style="color:#d9534f;">${dueDate}</strong>.
            </p>
            <p style="font-size:16px;line-height:1.6;">
              Please ensure your payment is submitted by the deadline to avoid any late fees or service disruptions.
            </p>
            <div style="margin:30px 0;text-align:center;">
              <a href="https://your-store-link.com/payment" target="_blank" style="background-color:#000;color:white;text-decoration:none;padding:12px 25px;border-radius:5px;font-weight:bold;display:inline-block;">
                Pay Now
              </a>
            </div>
            <p style="font-size:14px;color:#777;">If you've already made the payment, please ignore this message.</p>
          </div>
          <div style="background-color:#f9f9f9;padding:20px;text-align:center;font-size:13px;color:#999;">
            &copy; ${new Date().getFullYear()} Black & White Rentals. All rights reserved.
          </div>
        </div>
      </body>
      </html>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;

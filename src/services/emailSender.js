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
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
    html: `
    <html>
    <head>
      <style>
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
            padding: 10px;
            text-align: center;
          }
          img {
            height: 90px !important;
            width: 90px !important;
          }
        }
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          text-align: center;
        }
        .container {
          max-width: 600px;
          border: 30px solid black;
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        img {
          height: 170px;
          width: 170px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="img-container">
          <img
            src="https://i.pinimg.com/564x/f2/c3/cd/f2c3cd120df823e9de2c49c8466fbc26.jpg"
          />
        </div>
        <h1>Hello MR. Hajrizi!</h1>
        <p>
          You have an outstanding rent payment for your store, which is due by
          <strong>05.12.2023</strong>. Please ensure the payment is made by the
          deadline to avoid any inconvenience.
        </p>
        <!-- <p>
          You can add more content, images, links, and apply styles using HTML and
          CSS.
        </p> -->
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

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_BREVO,
    pass: process.env.SECRET_SENDIBLUE,
  },
});
module.exports = transporter;

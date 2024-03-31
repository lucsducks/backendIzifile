// helpers/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'eduardorosaslucas2@gmail.com',  // Tu dirección de correo electrónico registrada en SendinBlue
        pass: process.env.SECRET_SENDIBLUE  // Tu clave SMTP de SendinBlue
    }
});
module.exports = transporter;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.porkbun.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});

module.exports = transporter;
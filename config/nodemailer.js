const { createTransport } = require('nodemailer');
require("dotenv").config();


const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_MAIL_ID,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

module.exports = transporter;
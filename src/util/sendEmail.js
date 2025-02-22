const nodemailer = require("nodemailer");
const config = require("../config");

const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.smtp.smtp_host,
    service: config.smtp.smtp_service,
    port: parseInt(config.smtp.smtp_port),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: config.smtp.smtp_mail,
      pass: config.smtp.smtp_password,
    },
  });

  const { email, subject, html } = options;

  const mailOptions = {
    from: `${config.smtp.NAME} <${config.smtp.smtp_mail}>`,
    to: email,
    date: formattedDate,
    signed_by: "bdCalling.com",
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };

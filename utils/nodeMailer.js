const nodemailer = require("nodemailer");
const AppError = require("./Error");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = async (email, text, html) => {
  try {
    const result = await transporter.sendMail({
      from: '<no-reply@times-up.ru>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: text, // plain text body
      html: html, // html body
    });
  } catch (error) {
    new AppError(`Error with sending email: ${error}`, 500)
  }
}

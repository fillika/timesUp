const nodemailer = require("nodemailer");
const AppError = require("./Error");

const SMTP_BZ_CONFIG = {
  host: process.env.SMTP_HOST_BZ,
  port: process.env.SMTP_PORT_BZ,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_LOGIN_BZ, // generated ethereal user
    pass: process.env.SMTP_PASSWORD_BZ, // generated ethereal password
  },
  // dkim: {
  //   domainName: "example.com",
  //   keySelector: "2017",
  //   privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg..."
  // }
}

const SMTP_DEV_CONFIG = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },

}

const nodeMailerConfig = process.env.NODE_ENV === 'development' ? SMTP_DEV_CONFIG : SMTP_BZ_CONFIG;

let transporter = nodemailer.createTransport(nodeMailerConfig);

exports.sendEmail = async (email, text, html) => {
  try {
    await transporter.sendMail({
      from: '<no-reply@times-up.ru>', // sender address
      to: email, // list of receivers
      subject: "Times-Up", // Subject line
      text: text, // plain text body
      html: html, // html body
    });
  } catch (error) {
    new AppError(`Error with sending email: ${error}`, 500)
  }
}

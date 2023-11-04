const nodemailer = require("nodemailer");
// Lấy thông tin cấu hình email từ biến môi trường
const emailService = process.env.EMAIL_SERVICE;
const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

const config_mail = {
  service: emailService,
  host: emailHost,
  port: emailPort,
  auth: {
    user: emailUser,
    pass: emailPassword
  }
};
const transport = nodemailer.createTransport(config_mail);
module.exports = transport;
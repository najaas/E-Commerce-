const nodemailer = require("nodemailer");
const emailverification=(email,otp)=>{
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const mailOption = {
    from: {
      name: "Verification",
      address: "muhammednajaas24@gmail.com",
    },
    to: email,
    subject: "OTP",
    text: `Your OTP is ${otp}`,
  };
  const sendMail = async (transporter, mailOption) => {
    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log(Error`occurred while sending email: ${error}`);
    }
  };
  sendMail(transporter, mailOption)
}
module.exports =emailverification;


// const nodemailer=require('nodemailer');

// const sendotp=(email,otp)=>{
//   console.log('otp is ',otp);
// const transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//      user:process.env.AUTH_EMAIL,
//      pass:process.env.AUTH_PASSWORD
//     },
// })


// const mailOption = {
//     from: {
//       name: 'pe-cart',
//       address: "muhammednajaas24@gmail.com",
//     },
    
//     to:email,
//     subject: "OTP from pe -cart Application",
//     text: `Your OTP is ${otp}`,

//   };
//   const sendMail = async (transporter, mailOption) => {
//     try {
//       await transporter.sendMail(mailOption);
//       console.log("Mail has been sent successfully");
//     } catch (error) {
//       console.log(Error,`occurred while sending email: ${error}`);
//     }
//   };
//   sendMail(transporter,mailOption);
//   console.log(`transporter${transporter}`);
// }
// console.log('otp ready');
// module.exports= sendotp;



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
      console.log("Mail has been sent successfully");
    } catch (error) {
      console.log(Error`occurred while sending email: ${error}`);
    }
  };
  sendMail(transporter, mailOption)
}
module.exports =emailverification;
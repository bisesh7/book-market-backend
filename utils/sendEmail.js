const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bookmarketadmeen@gmail.com",
    pass: "l>%Ww09itcu~6$",
  },
});

const sendMail = (email, text) => {
  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Admin" <book_market_admin@bookmarket.com>', // sender address
    to: email, // receiver
    subject: "Password Reset", // Subject line
    text, // plain text body
  });
};

module.exports = sendMail;

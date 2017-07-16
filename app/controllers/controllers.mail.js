const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "manateemusicofficiel@gmail.com",
       pass: "jojokyfran"
   }
});


exports.sendMail = (req, res) => {
  const mailOptions = {
      from: `${req.body.lastName} ${req.body.firstName} <${req.body.email}>`, // sender address
      to: 'manateemusicofficiel@gmail.com', // list of receivers
      subject: `${req.body.object}`, // Subject line
      text: `${req.body.message}`, // plain text body
      html: `<b>${req.body.message}</b>` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.send('Message %s sent: %s', info.messageId, info.response);
  });
};

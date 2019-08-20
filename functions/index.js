const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;

let transporter = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
  }
);

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting 'from' email by query string
        const from = req.query.from;
        const message = req.query.message;

        const mailOptions = {
            from: from, // Something like: janedoe@gmail.com
            to: gmailEmail,
            subject: `Contact form message from: ${from}`, // email subject
            html: `<p>${message}</p>` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.send(error.toString());
            }
            return res.send('Sended');
        });
    });    
});

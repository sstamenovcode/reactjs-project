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
            if (error){
                return res.send(error.toString());
            }
            return res.send('Sended');
        });
    });    
});

exports.addAdminRole = functions.https.onCall(async (data, context) => {
    const uid = await admin
                        .auth()
                        .verifyIdToken(data.token)
                        .then(decodedToken => {
                            return decodedToken.uid;
                        }).catch(error => {
                            return error;
                        });

    const isAdmin = await admin
                        .auth()
                        .getUser(uid)
                        .then((userRecord) => {
                            // check if the request is made by admin
                            if (userRecord.customClaims && userRecord.customClaims.admin) {
                                return true;
                            } else {
                                return false;
                            }
                        }).catch(error => {
                            return error;
                        });
    if (!isAdmin) {
        return { error: 'Only admins can add other users as admins.' };
    } else {
        return admin
            .auth()
            .getUserByEmail(data.email)
            .then(async user => {
                await admin.auth().setCustomUserClaims(user.uid, {
                    admin: true
                });

                return { ...user, result: { customClaims: true }};
            })
            .catch(error => {
                return error;
            });
    }
});

exports.removeAdminRole = functions.https.onCall(async (data, context) => {
    const uid = await admin
                        .auth()
                        .verifyIdToken(data.token)
                        .then(decodedToken => {
                            return decodedToken.uid;
                        }).catch(error => {
                            return error;
                        });

    const isAdmin = await admin
                        .auth()
                        .getUser(uid)
                        .then((userRecord) => {
                            // check if the request is made by admin
                            if (userRecord.customClaims && userRecord.customClaims.admin) {
                                return true;
                            } else {
                                return false;
                            }
                        }).catch(error => {
                            return error;
                        });
    if (!isAdmin) {
        return { error: 'Only admins can remove other admins.' };
    } else {
        return admin
            .auth()
            .getUserByEmail(data.email)
            .then(async user => {
                await admin.auth().setCustomUserClaims(user.uid, {
                    admin: false
                });

                return { ...user, result: { customClaims: false }};
            })
            .catch(error => {
                return error;
            });
    }
});

exports.getAllUsers = functions.https.onCall((data, context) => {
    return admin
        .auth()
        .listUsers()
        .then(listUsersResult => {
            let allUsers = [];

            listUsersResult.users.forEach(userRecord => {
                allUsers.push(userRecord.toJSON());
            });

            return allUsers;
        })
        .catch(error => {
            console.log('Error listing users:', error);
        });
});

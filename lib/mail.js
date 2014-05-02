/*
 * Lib
 * mail.js
 */

/* Include Modules */
var nodemailer = require('nodemailer');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "mkeele@umail.iu.edu",
        pass: "Flp35lph"
    }
});

exports.smtpTransport = smtpTransport;
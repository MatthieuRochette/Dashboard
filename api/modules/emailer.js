var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDR || "lagachette68@gmail.com",
    pass: process.env.EMAIL_PASSWD || "zsosnfabvaxyasli"
  }
});

/**
 * Create a normal text email
 *
 * @param {String} to - destination email address
 * @param {String} subject - subject of the email
 * @param {String} text - the content of your email
 * @returns a JS Object ready to send.
 */
async function newTxtMail(to, subject, text) {
  return {
    from: process.env.EMAIL_ADDR || "lagachette68@gmail.com",
    to: to,
    subject: subject,
    text: text
  };
}

/**
 * Create a HTML email
 *
 * @param {String} to - destination email address
 * @param {String} subject - subject of the email
 * @param {String} html - The HTML code content of your email
 * @returns a JS Object ready to send.
 */
async function newHtmlMail(to, subject, html) {
  return {
    from: process.env.EMAIL_ADDR || "lagachette68@gmail.com",
    to: to,
    subject: subject,
    html: html
  };
}

/**
 * Send an email
 *
 * @param {Object} mailObj - a mail object created with newTxtMail() or newHtmlMail()
 */
async function send(mailObj) {
  transporter.sendMail(mailObj, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports.newHtmlMail = newHtmlMail;
module.exports.newTxtMail = newTxtMail;
module.exports.send = send;
const nodemailer = require("nodemailer");

module.exports.createMailer = (config) =>{
    let mailer = nodemailer.createTransport(config);
    return mailer
}
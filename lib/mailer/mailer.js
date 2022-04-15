const nodemailer = require("nodemailer");
const createMailer = (config) =>{
    let mailer = nodemailer.createTransport(config);
    return sendEmail.bind(null, mailer, config.from)
}

const sendEmail = async (mailer, from, { to, subject, html, attachments}) => {
    await mailer.sendMail({
        from,
        to,
        subject,
        html,
        attachments
    });
}

module.exports = { createMailer }
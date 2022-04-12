const nodemailer = require("nodemailer");

const createMailer = (config) =>{
    let mailer = nodemailer.createTransport(config);
    return sendEmail.bind(null, mailer, config.from)
}

const sendEmail = async (mailer, from, to, subject, body) => {
    await mailer.sendMail({
        from,
        to,
        subject,
        text: body
    });
}

module.exports = {
    createMailer
}
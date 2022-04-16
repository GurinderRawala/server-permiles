const nodemailer = require("nodemailer");
const createMailer = (config, log) =>{
    let mailer = nodemailer.createTransport(config);
    return sendEmail.bind(null, mailer, config.from, log)
}
const sendEmail = async (mailer, from, log, { to, subject, body, attachments}) => {
    try{
        const sentEmailResponse = await mailer.sendMail({
            from,
            to,
            subject,
            html:body,
            attachments
        });
        log.info(sentEmailResponse.messageId, 'Email sent successfully');
    }catch(err){
        log.error(err, 'Error sending email')
    }
}

module.exports = { createMailer }
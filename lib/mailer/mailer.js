const nodemailer = require('nodemailer')
const { renderEmail } = require('./render-email-templates')
const createMailer = (config, log) => {
  let mailer = nodemailer.createTransport(config)
  return {
    send: sendEmail.bind(null, mailer, config.from, log),
  }
}
const sendEmail = async (
  mailer,
  from,
  log,
  template,
  { to, subject, attachments, payload }
) => {
  const body = await renderEmail(log, template, payload)
  try {
    const sentEmailResponse = await mailer.sendMail({
      from,
      to,
      subject,
      html: body,
      attachments,
    })
    log.info(sentEmailResponse.messageId, 'Email sent successfully')
  } catch (err) {
    log.error(err, 'Error sending email')
  }
}

module.exports = { createMailer }

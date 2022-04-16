const Email = require("email-templates");
const path = require('path')
const emailTemplate = new Email();
const renderEmail = async(log, template, emailPayload) =>{
    const Path = path.join(__dirname, `templates/${template}`)
    try{
        const emailBody = await emailTemplate.render(Path, emailPayload)
        return emailBody
    }catch(err){
        log.error(err, 'Error creating email template')
        throw new Error('Error')
    }
}
module.exports = { renderEmail }


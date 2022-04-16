const Email = require("email-templates");
const path = require('path')
const emailTemplate = new Email();
const renderEmail = async(template, emailPayload) =>{
    const Path = path.join(__dirname, `templates/${template}`)
    return await emailTemplate.render(Path, emailPayload)
}
module.exports = { renderEmail }


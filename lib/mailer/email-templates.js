const Email = require("email-templates");
const path = require('path')
const emailTemplate = new Email();
const renderEmail = async(template, locals) =>{
    const Path = path.join(__dirname, `templates/${template}`)
    return await emailTemplate.render(Path, locals)
}
module.exports = { renderEmail }


module.exports = ({email, company, username}, inviteLink) =>{
    const subject = `${company} sent you an invite to join Per Miles`
    const body = `
    <center><img src="https://www.permiles.com/black_trans.png" style="width: 200px; height: auto;" /></center>
    <p style="text-align: center">
    Visit the link below to accept the invite. Ignore this email if you are not associated with ${company}.<br />
    <b>Your Credentials: </b><br />
    Username: ${username}<br />
    Password: Contact ${company} to get password
    </p>
    <a target="_blank" href="${inviteLink}" 
    style="background-color: seagreen, color: white, padding: 8px 8px">
    Accept Invite
    </a><br />
    Thanks,<br />
    Per Miles`;
    return{
        subject,
        body,
        to:email,
        attachments: []
    }
}

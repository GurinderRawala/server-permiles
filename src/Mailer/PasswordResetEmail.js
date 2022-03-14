module.exports = (code) =>{
    const mailBody = `
    <center><img src="https://www.permiles.com/black_trans.png" style="width: 200px; height: auto;" /></center>
    <p>We have received a request to reset the password for your Per Miles acoount.
     To reset it, Enter your password reset code to validate and then enter your new passowrd.</p>
     <br />
     <b>Your password reset code: </b>
     <h4>${code}</h4>

     Thanks,
     Per Miles
    `;

    return mailBody;
}
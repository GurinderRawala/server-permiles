module.exports = (code) =>{
    const mailBody = `
      <center><img src="https://www.permiles.com/black_trans.png" style="width: 200px; height: auto;" /></center>
      <p>
      There is a quick step you need to complete before you start using Per Miles account. Lets make sure this is the 
      right email address for you.
      <br />
      Please enter this verifictaion code to get started on Per Miles.
      </p>
      <h3>${code}</h3>
      Thanks,<br />
      Per Miles
    `;

    return mailBody;
}
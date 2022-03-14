const nodemailer = require("nodemailer");

 const SendEmail = async (subject, to, body, attachment) =>{
    let transporter = nodemailer.createTransport({
        name: "permiles.com",
        host: "mail.permiles.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'no-reply@permiles.com', // generated ethereal user
          pass: 'Rawala39!!', // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
      });
   
    try{
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Per Miles" <no-reply@permiles.com>', // sender address
        to: to, // list of receivers
        subject: `${subject}`, // Subject line
        //text: "Hello world?", // plain text body
        html: body, // html body
        attachments: attachment
      });

      console.log("Message sent: %s", info.messageId);
     
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }catch(err){
        console.log(err)
    }
}

//SendEmail().catch(console.error);

module.exports = SendEmail
const nodemailer = require('../../conn/nodemailer');
module.exports.touser = async (email,message) => 
{
    try {
        
        let info = await nodemailer.transporter.sendMail({
            from: process.env.AUTH_MAILER_EMAIL,
            to: email,
            subject: "staff assigned",
            html: message
         });     console.log('email sent');

       } 
       catch (error) {
        console.log(error)
       }
}

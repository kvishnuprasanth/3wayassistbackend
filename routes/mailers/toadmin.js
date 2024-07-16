const nodemailer = require('../../conn/nodemailer');
module.exports.toadmin = async (email,message,subject) => 
{
    try {
        
        let info = await nodemailer.transporter.sendMail({
            from: process.env.AUTH_MAILER_EMAIL,
            to: email,
            subject: subject,
            html: message
         });     console.log('email sent');

       } 
       catch (error) {
        console.log(error)
       }
}

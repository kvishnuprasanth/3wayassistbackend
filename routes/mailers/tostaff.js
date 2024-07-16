const nodemailer = require('../../conn/nodemailer');
module.exports.tostaff = async (email,message) => 
{
    try {
        
        let info = await nodemailer.transporter.sendMail({
            from: process.env.AUTH_MAILER_EMAIL,
            to: email,
            subject: "NEW TICKET",
            html: message
         });     console.log('email sent');

       } 
       catch (error) {
        console.log(error)
       }
}

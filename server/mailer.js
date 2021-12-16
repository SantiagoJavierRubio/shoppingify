const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

/* TEST NODEMAILER */

// transporter.verify(function(error, success){
//     if(error) return console.log(error)
//     return console.log('Nodemailer ready to mail!')
// })

module.exports = transporter;
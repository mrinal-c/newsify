'use server';
import nodemailer from 'nodemailer';

export async function sendMail(email) {
    try {
        var transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
          });
    
        const response = await transporter.sendMail({
            from: 'mailtrap@demomailtrap.com',
            to: 'cmrinal16@gmail.com',
            subject: 'Newsify Account Request',
            text: email
        });
    
    } catch (e) {
        console.log(e);
    }
    

}
import nodemailer from "nodemailer";
import {
  EMAIL_SERVICE,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SENDER
} from "./constants.js";

export async function sendEmail({
  to,
  subject,
  text,
  html='',
  name = EMAIL_SENDER,
  from = process.env.FROM_EMAIL,
}) {
  try{
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });
  
    const info = await transporter.sendMail({
      from: `${name} <${from}>`,
      to,
      subject,
      text,
      html,
    });
  
    return info;
  } catch(e) {
    return false;
    console.log(e);
  }
  
}

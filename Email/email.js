import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { template } from "./emailTemplate.js";



export async function sendEmail(email){
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "janna.wael.ali@gmail.com", 
    pass: "dwem vxmw esah sonl ", 
  },
});


let emailToken = jwt.sign(email, "emailToken")

  const info = await transporter.sendMail({
    from: '"From Note APP" <janna.wael.ali@gmail.com>',
    to: email,
    subject: "Welcome to Note App",
   
    html: template(emailToken), 
  });

  console.log("Message sent:", info.messageId);
}
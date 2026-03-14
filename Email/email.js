import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { template } from "./emailTemplate.js";
import { orderTemplate } from "./orderTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "janna.wael.ali@gmail.com", 
    pass: "dwem vxmw esah sonl ", 
  },
});

export async function sendEmail(email){
let emailToken = jwt.sign(email, "emailToken")
  const info = await transporter.sendMail({
    from: '"From Note APP" <janna.wael.ali@gmail.com>',
    to: email,
    subject: "Welcome to Note App",
   
    html: template(emailToken), 
  });
  console.log("Message sent:", info.messageId);
}

export async function sendOrderEmail(order, action = "placed") {
  try {
    await transporter.sendMail({
      from: '"Your Store" <janna.wael.ali@gmail.com>',
      to: order.user.email,
      subject: `Order ${action.charAt(0).toUpperCase() + action.slice(1)} - Order #${order._id}`,
      html: orderTemplate(order, action)
    });
    console.log(`Order ${action} email sent to:`, order.user.email);
  } catch (error) {
    console.error("Error sending order email:", error);
  }
}
// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       connectionTimeout: 10000,
//     });

//     await transporter.verify();

//     await transporter.sendMail({
//       from: `"Spark Parking" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });
//   } catch (error) {
//     console.error("Email Error:", error);
//   }
// };

import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

// console.log("resend: ", process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await resend.emails.send({
      from: "Spark Parking <onboarding@resend.dev>",
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", response);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

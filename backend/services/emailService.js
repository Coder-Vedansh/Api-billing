import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail", // OR use your SMTP host
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendEmail = async (to, subject, html) => {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.log("Mock Email Sent:");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        // console.log(`Body: ${html}`);
        return;
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    console.log("Connecting to Gmail...");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Sending email to:", options.email);

    const info = await transporter.sendMail({
      from: `Bushel <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

export default sendEmail;

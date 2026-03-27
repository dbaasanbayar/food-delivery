import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
});

export const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Нууц үг сэргээх OTP код",
        html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Нууц үг сэргээх</h2>
          <p>Таны OTP код:</p>
          <h1 style="color: #18181B; letter-spacing: 8px;">${otp}</h1>
          <p>Энэ код 10 минут хүчинтэй.</p>
        </div>
      `,
    })
}
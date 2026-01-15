import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    // 1️⃣ Email to ADMIN
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["fahadali2951@gmail.com"],
      subject: "New Portfolio Inquiry",
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    // 2️⃣ Auto-Reply to USER
await resend.emails.send({
  from: "Fahad Ali <onboarding@resend.dev>",
  to: [email],
  subject: "Your Inquiry Has Been Received – Fahad Ali",
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #ff6b00;">Hello ${name},</h2>
      <p>Thank you for reaching out! I’ve received your message and appreciate you taking the time to get in touch.</p>
      
      <p><strong>Your Message:</strong></p>
      <blockquote style="border-left: 4px solid #ff6b00; padding-left: 16px; color: #555;">
        ${message}
      </blockquote>

      <p>I will review your inquiry and aim to respond within <strong>24–48 hours</strong>.  
      If your request is urgent, feel free to reach me directly via <a href="https://wa.me/923326067339" style="color: #ff6b00; text-decoration: none;">WhatsApp</a>.</p>
      
      <p>Connect with me on social media for updates and projects:</p>
      <p style="display: flex; gap: 10px;">
        <a href="https://github.com/fahadali297t" style="color: #ff6b00; text-decoration: none;">GitHub</a> | 
        <a href="https://www.linkedin.com/in/fahad-ali-369649355/" style="color: #ff6b00; text-decoration: none;">LinkedIn</a> | 
        <a href="https://wa.me/923326067339" style="color: #ff6b00; text-decoration: none;">WhatsApp</a>
      </p>

      <p>Also, feel free to explore my portfolio for additional projects and services: <a href="https://fahaddev-peach.vercel.app" style="color: #ff6b00; text-decoration: none;">Portfolio Website</a>.</p>
      
      <br />
      <p>Best regards,</p>
      <p style="font-weight: bold; color: #ff6b00;">Fahad Ali</p>
      <p style="font-size: 12px; color: #888;">Frontend & Backend Developer | Performance Optimization | Architectural Consulting</p>
    </div>
  `,
});


    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Email failed" });
  }
}

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
      subject: "Thanks for contacting me",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I’ve received your message and will respond shortly.</p>
        <br />
        <p>— Fahad Ali</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Email failed" });
  }
}

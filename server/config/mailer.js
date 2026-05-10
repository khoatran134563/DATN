const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendResetPasswordEmail = async ({ to, fullName, resetLink }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="color: #1d4ed8;">ChemLearn - Đặt lại mật khẩu</h2>
      <p>Xin chào <strong>${fullName || 'bạn'}</strong>,</p>
      <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản ChemLearn của bạn.</p>
      <p>Nhấn vào nút bên dưới để đặt lại mật khẩu. Liên kết này sẽ hết hạn sau <strong>15 phút</strong>.</p>

      <p style="margin: 24px 0;">
        <a href="${resetLink}" style="
          background: #2563eb;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 8px;
          display: inline-block;
          font-weight: bold;
        ">
          Đặt lại mật khẩu
        </a>
      </p>

      <p>Nếu nút không hoạt động, hãy sao chép đường dẫn này vào trình duyệt:</p>
      <p style="word-break: break-all; color: #2563eb;">${resetLink}</p>

      <p>Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
      <hr style="margin: 24px 0;" />
      <p style="font-size: 12px; color: #6b7280;">
        Email này được gửi tự động từ hệ thống ChemLearn.
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: `"ChemLearn" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'ChemLearn - Đặt lại mật khẩu',
    html,
  });
};

module.exports = {
  transporter,
  sendResetPasswordEmail,
};
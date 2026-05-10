const express = require('express');
const cors = require('cors');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET chưa được cấu hình trong file .env");
}

const connectDB = require('./config/db');
const ensureAdmin = require('./config/ensureAdmin');
const classroomRoutes = require('./routes/classroomRoutes');
const elementRoutes = require('./routes/elementRoutes');
const quizRoutes = require('./routes/quizRoutes');
const seedRoutes = require('./routes/seedRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));

const startServer = async () => {
  try {
    await connectDB();
    await ensureAdmin();

    app.use('/api/auth', authRoutes);
    app.use('/api/classrooms', classroomRoutes);
    app.use('/api/elements', elementRoutes);
    app.use('/api', quizRoutes);
    app.use('/seed-data', seedRoutes);
    app.use('/api/classrooms', classroomRoutes);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động server:", error);
    process.exit(1);
  }
};

startServer();
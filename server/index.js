const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET chưa được cấu hình trong file .env');
}

const connectDB = require('./config/db');
const ensureAdmin = require('./config/ensureAdmin');

const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const elementRoutes = require('./routes/elementRoutes');
const quizRoutes = require('./routes/quizRoutes');
const seedRoutes = require('./routes/seedRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const forumRoutes = require('./routes/forumRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://datn-bice.vercel.app',
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '25mb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'ChemLearn backend is running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    message: 'Backend OK',
    time: new Date().toISOString(),
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await ensureAdmin();

    app.use('/api/auth', authRoutes);
    app.use('/api/classrooms', classroomRoutes);
    app.use('/api/elements', elementRoutes);
    app.use('/api/upload', uploadRoutes);
    app.use('/api/forum', forumRoutes);
    app.use('/api', quizRoutes);
    app.use('/seed-data', seedRoutes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Lỗi khởi động server:', error);
    process.exit(1);
  }
};

startServer();
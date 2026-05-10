const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chemlearn_db');
    console.log("✅ Đã kết nối MongoDB");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
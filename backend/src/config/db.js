const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb';
  try {
    await mongoose.connect(uri);
    console.log(`[db] Conectado ao MongoDB em ${uri}`);
  } catch (err) {
    console.error('[db] Falha ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

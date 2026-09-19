require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3001;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] API rodando na porta ${PORT}`);
  });
}

start();

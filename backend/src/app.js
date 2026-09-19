const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'O titulo e obrigatorio'],
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, 'O conteudo e obrigatorio'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'O autor e obrigatorio'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Indice de texto para permitir busca por titulo/conteudo (GET /posts/search)
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);

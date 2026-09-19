const Post = require('../models/Post');

// GET /posts - lista todos os posts (alunos e area administrativa)
async function listPosts(req, res, next) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /posts/search?q=termo - busca por titulo ou conteudo
async function searchPosts(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(400).json({ message: 'Informe o parametro de busca "q".' });
    }

    const regex = new RegExp(q.trim(), 'i');
    const posts = await Post.find({
      $or: [{ title: regex }, { content: regex }],
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /posts/:id - le um post especifico
async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post nao encontrado.' });
    }
    res.json(post);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID de post invalido.' });
    }
    next(err);
  }
}

// POST /posts - cria uma nova postagem (protegido)
async function createPost(req, res, next) {
  try {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

// PUT /posts/:id - edita uma postagem existente (protegido)
async function updatePost(req, res, next) {
  try {
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post nao encontrado.' });
    }
    res.json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID de post invalido.' });
    }
    next(err);
  }
}

// DELETE /posts/:id - exclui uma postagem (protegido)
async function deletePost(req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post nao encontrado.' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID de post invalido.' });
    }
    next(err);
  }
}

module.exports = {
  listPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

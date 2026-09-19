const express = require('express');
const requireAuth = require('../middleware/auth');
const {
  listPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Rotas publicas (alunos)
router.get('/search', searchPosts); // GET /posts/search?q=termo
router.get('/', listPosts); // GET /posts
router.get('/:id', getPost); // GET /posts/:id

// Rotas protegidas (professores)
router.post('/', requireAuth, createPost); // POST /posts
router.put('/:id', requireAuth, updatePost); // PUT /posts/:id
router.delete('/:id', requireAuth, deletePost); // DELETE /posts/:id

module.exports = router;

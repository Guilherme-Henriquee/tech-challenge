const jwt = require('jsonwebtoken');

/**
 * Protege rotas que exigem um professor autenticado.
 * Espera um header: Authorization: Bearer <token>
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticacao nao informado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalido ou expirado.' });
  }
}

module.exports = requireAuth;

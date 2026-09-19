/* eslint-disable no-unused-vars */
function notFound(req, res, next) {
  res.status(404).json({ message: `Rota nao encontrada: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Erro interno do servidor.',
  });
}

module.exports = { notFound, errorHandler };

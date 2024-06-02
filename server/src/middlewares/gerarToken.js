const jwt = require('jsonwebtoken');

function gerarToken(user) {
  const payload = {
    id: user.id,
    nome: user.nome,
    idPosto: user.idPosto
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}

module.exports = gerarToken;
// 1. Carrega as variáveis do .env (deve ser a primeira coisa a rodar)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importa a conexão com o banco (apenas para garantir o teste de conexão na inicialização)
require('./config.js');

// Importa as rotas das suas entidades
const plantaRoutes = require('./routes/plantaRoutes');
const culturaRoutes = require('./routes/culturaRoutes');
const manejoRoutes = require('./routes/manejoRoutes');

const app = express();

// 2. Middlewares globais
app.use(cors()); // Permite requisições do front-end (ex: React na porta 3000)
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// 3. Registro das Rotas
app.use('/plantas', plantaRoutes);
app.use('/culturas', culturaRoutes);
app.use('/manejos', manejoRoutes);

// Rota de teste simples para verificar se a API está online
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Culturas rodando com sucesso!' });
});

// 4. Inicialização do Servidor na porta 3003
const PORT = process.env.PORT || 3003;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// 1. Configuração para ler JSON e arquivos do site (HTML/CSS)
app.use(express.json());
app.use(express.static(__dirname)); // Serve os arquivos da pasta atual (index.html, style.css, etc.)

// 2. Conexão com Banco de Dados (Cria o arquivo 'clinica.db' se não existir)
const dbPath = path.resolve(__dirname, 'clinica.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// 3. Criação da Tabela (Se não existir)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        telefone TEXT,
        mensagem TEXT,
        data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// 4. Rota para Receber os Dados (API)
app.post('/api/salvar-contato', (req, res) => {
    const { nome, telefone, mensagem } = req.body;
    
    // Query SQL para inserir dados
    const sql = `INSERT INTO contatos (nome, telefone, mensagem) VALUES (?, ?, ?)`;
    
    db.run(sql, [nome, telefone, mensagem], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        // Retorna sucesso e o ID criado
        res.json({ 
            message: "Sucesso!", 
            id: this.lastID 
        });
        console.log(`Novo contato salvo! ID: ${this.lastID}`);
    });
});

// 5. Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
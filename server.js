const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 1. Rota do Site Principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. NOVA Rota da Área do Funcionário
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// 3. Rota para Salvar Agendamentos
app.post('/api/salvar-contato', async (req, res) => {
    const { nome, telefone, mensagem } = req.body;
    const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbzW943XeOeG9MJNf7Mf5XDxb5w6E0jo12A-AAdZsH-YLhTVWkZ5ZEv1DRxZ5QsUKTv3-w/exec"; // Certifique-se de colocar sua URL real aqui

    try {
        await fetch(GOOGLE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome, telefone, mensagem,
                data: new Date().toLocaleString("pt-BR")
            })
        });
        res.json({ message: "Sucesso!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro ao enviar" });
    }
});

// 4. Rota para Listar Agendamentos na tela Admin
app.get('/api/listar-contatos', async (req, res) => {
    const GOOGLE_URL_GET = "https://script.google.com/macros/s/AKfycbzW943XeOeG9MJNf7Mf5XDxb5w6E0jo12A-AAdZsH-YLhTVWkZ5ZEv1DRxZ5QsUKTv3-w/exec"; // Use a URL da "Nova Implantação" do Google

    try {
        const resposta = await fetch(GOOGLE_URL_GET);
        const dados = await resposta.json();
        res.json(dados);
    } catch (e) {
        console.error("Erro ao buscar dados:", e);
        res.json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
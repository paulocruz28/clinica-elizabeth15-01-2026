const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Rota para o site abrir direto
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de salvamento (focada no Google Sheets)
app.post('/api/salvar-contato', async (req, res) => {
    const { nome, telefone, mensagem } = req.body;
    
    // URL do seu Script do Google
    const GOOGLE_URL = "SUA_URL_DO_GOOGLE_AQUI"; 

    try {
        await fetch(GOOGLE_URL, {
            method: 'POST',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
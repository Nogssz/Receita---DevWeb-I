
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let receitas = [
    { id: 1, nome: 'Bolo de Cenoura', ingredientes: ['cenoura', 'farinha', 'açúcar', 'ovos'], instrucoes: 'Misture e asse.' },
    { id: 2, nome: 'Mousse de Chocolate', ingredientes: ['chocolate', 'creme de leite', 'ovos'], instrucoes: 'Misture e resfrie.' }
];


app.get('/receitas', (req, res) => {
    res.json(receitas);
});


app.get('/receitas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const receita = receitas.find(r => r.id === id);
    if (receita) {
        res.json(receita);
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});


app.post('/receitas', (req, res) => {
    const { nome, ingredientes, instrucoes } = req.body;
    const id = receitas.length ? receitas[receitas.length - 1].id + 1 : 1;
    const novaReceita = { id, nome, ingredientes, instrucoes };
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});


app.put('/receitas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, ingredientes, instrucoes } = req.body;
    const receitaIndex = receitas.findIndex(r => r.id === id);

    if (receitaIndex !== -1) {
        receitas[receitaIndex] = { id, nome, ingredientes, instrucoes };
        res.json(receitas[receitaIndex]);
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});


app.delete('/receitas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const receitaIndex = receitas.findIndex(r => r.id === id);

    if (receitaIndex !== -1) {
        const receitaDeletada = receitas.splice(receitaIndex, 1);
        res.json(receitaDeletada[0]);
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

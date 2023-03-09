const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs'); //Configurando o EJS como a view engine do servidor express

//Use o caminho indicado para o servir conteúdo estático
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (request, response) => {
    response.render('pages/index');
});

app.listen(8080, () => console.log("Servidor rodando!"));
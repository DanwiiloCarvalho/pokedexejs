const express = require('express');
const path = require('path');
const fetchPokemon = require('./PokemonService');
const app = express();

const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

app.set('view engine', 'ejs'); //Configurando o EJS como a view engine do servidor express

//Use o caminho indicado para o servir conteúdo estático
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (request, response) => {
    /* fetchPokemon(apiUrl)
    .then(data => console.log(data)); */

    /* fetchPokemon(apiUrl)
    .then(data => response.render('pages/index', {data}))
    .catch(error => console.log("Deu erro: " + error)); */
    
    fetchPokemon(apiUrl, response);
});

app.listen(8080, () => console.log("Servidor rodando!"));
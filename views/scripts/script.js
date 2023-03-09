/**Requisição para detalhes do pokémon para em seguida construir o modal*/
async function modalRender(url) {
    const responseDetails = await fetch(url);
    const jsonDetails = await responseDetails.json();
    /* console.log(jsonDetails); */

    /**Renderização do filtro escuro do fundo*/
    const body = document.querySelector("body");
    const filter = document.createElement("div");
    filter.classList.add("filter");
    body.prepend(filter);

    /**Renderização do modal */
    const main = document.querySelector("main.container");
    const modal = document.createElement("section");
    modal.classList.add("modal");
    body.classList.add("hide");
    main.appendChild(modal);

    /**Correção do idioma da descrição */
    const englishDescription = jsonDetails.flavor_text_entries.filter(value => {
        if(value.language.name === 'en') return value;
    });
    
    const modalContent = `
        <h3>${jsonDetails.name}</h3>
        <span id="close" class="material-symbols-outlined">close</span>
        <p class="number">Nº ${jsonDetails.id}</p>
        <img class="official-artwork" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${jsonDetails.id}.svg">
        <p class="description">${englishDescription[0].flavor_text.replace("\n", " ").replace("\f", " ")}</p>
    `;
    modal.innerHTML = modalContent;

    /**Implementação do botão close do modal*/
    const closeButton = document.querySelector("section.modal > span#close");
    closeButton.addEventListener("click", () => {
        document.querySelector("main.container").removeChild(modal);
        body.removeChild(filter);
        body.classList.remove("hide");

        const pokemonCards = document.querySelectorAll("li.card");
        pokemonCards.forEach(element => element.classList.remove("inactive-card"));
    });
}

/*Função que exibe o modal ao clicar em um card*/
function showModal() {
    //Capturando todos os cards de Pokémon
    const pokemonCards = document.querySelectorAll("li.card");
    pokemonCards.forEach(element => {
        element.addEventListener("click", () => {
            pokemonCards.forEach(element => element.classList.add("inactive-card"));
            const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon-species/${element.id}`;
            modalRender(pokemonDetailsUrl);
        });
    });
}

showModal();
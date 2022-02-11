const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon-container'),
      erroMessage = getElement('.error');

var pokeName,
    pokemon,
    card;

function getElement(element) {
    return document.querySelector(element);
}

function requestPokeInfo(url, name) {
    fetch(url + name)
      .then(response => response.json())
      .then(data => {
        pokemon = data;
      })
      .catch(err => console.log(err));
  }
  
function createCard () {
    card = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">Nome: ${pokemon.name}</h1>
          <h2 class="number">Registro Nacional ${pokemon.id}</h2>
          <h3 class="type">Tipo: ${pokemon.types.map(item => item.type.name).toString()}</h3>
      </div>`;
    return card;
  }

function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);
  
    setTimeout(function () {
      if(pokemon.detail) {
        erroMessage.style.display = 'block';
        container.style.display = 'none';
      }else{
        erroMessage.style.display = 'none';
        container.style.display = 'flex';
        container.innerHTML = createCard();
      }
    }, 2000);
}
  
searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startApp(pokeName);
    container.classList.add('fade');
  
    setTimeout(() => {
      container.classList.remove('fade');
    }, 3000);
  });

const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const pokemonContainer = document.getElementById("pokemon-container");

async function getPokemon() {
    if (!pokemonContainer) return;

    pokemonContainer.innerHTML = `
        <div class="text-center w-100">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const pokemons = data.results;
        pokemonContainer.innerHTML = "";

        pokemons.forEach((pokemon) => {
            const cardWrapper = document.createElement("div");
            cardWrapper.classList.add("col-md-4", "mb-4");

            cardWrapper.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                        <button class="btn btn-primary mt-3" onclick="verPokemon('${pokemon.name}')">
                            View details
                        </button>
                    </div>
                </div>
            `;

            pokemonContainer.appendChild(cardWrapper);
        });
    } catch (error) {
        console.error(error);
        pokemonContainer.innerHTML = `
            <div class="alert alert-danger w-100" role="alert">
                An error occurred while loading the Pokémon list.
            </div>
        `;
    }
}

function verPokemon(name) {
    window.location.href = `details.html?id=${name}`;
}

getPokemon();

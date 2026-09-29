const parameters = new URLSearchParams(window.location.search);
const id = parameters.get("id");
const pokemonDetails = document.getElementById("pokemon-details-container");

async function getPokemonDetails() {
    if (!pokemonDetails) return;

    if (!id) {
        pokemonDetails.innerHTML = `
            <div class="alert alert-warning w-100" role="alert">
                No Pokémon selected.
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        pokemonDetails.innerHTML = `
            <div class="col-md-6">
                <h2 class="text-capitalize">${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
            </div>
            <div class="col-md-6">
                <h3>Pokemon Info</h3>
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Abilities:</strong> ${pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
                <p><strong>Types:</strong> ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
                <p><strong>Stats:</strong></p>
                <ul>
                    ${pokemon.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
                </ul>
                <a href="index.html" class="btn btn-secondary mt-3">Back to list</a>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        pokemonDetails.innerHTML = `
            <div class="alert alert-danger w-100" role="alert">
                Unable to load this Pokémon.
            </div>
        `;
    }
}

getPokemonDetails();
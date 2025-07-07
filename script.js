document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const characterNameInput = document.getElementById('character-name');
    const resultsContainer = document.getElementById('results-container');
    const loadingElement = document.getElementById('loading');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const characterName = characterNameInput.value.trim();
        
        if (characterName) {
            searchCharacter(characterName);
        }
    });
    
    function searchCharacter(name) {
        // Mostra o loading
        resultsContainer.innerHTML = '';
        loadingElement.classList.remove('hidden');
        
        // Faz a requisição para a API
        fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Personagem não encontrado');
                }
                return response.json();
            })
            .then(data => {
                displayCharacters(data.results);
            })
            .catch(error => {
                showErrorMessage(error.message);
            })
            .finally(() => {
                loadingElement.classList.add('hidden');
            });
    }
    
    function displayCharacters(characters) {
        if (!characters || characters.length === 0) {
            showErrorMessage('Nenhum personagem encontrado');
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        const charactersGrid = document.createElement('div');
        charactersGrid.className = 'characters-grid';
        
        characters.forEach(character => {
            const characterCard = createCharacterCard(character);
            charactersGrid.appendChild(characterCard);
        });
        
        resultsContainer.appendChild(charactersGrid);
    }
    
    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'character-card';
        
        const image = document.createElement('img');
        image.src = character.image;
        image.alt = character.name;
        image.className = 'character-image';
        
        const info = document.createElement('div');
        info.className = 'character-info';
        
        const name = document.createElement('h2');
        name.textContent = character.name;
        name.className = 'character-name';
        
        const status = document.createElement('p');
        status.className = 'character-details';
        
        const statusIndicator = document.createElement('span');
        statusIndicator.className = `status status-${character.status.toLowerCase()}`;
        
        status.appendChild(statusIndicator);
        status.appendChild(document.createTextNode(` ${character.status} - ${character.species}`));
        
        const location = document.createElement('p');
        location.className = 'character-details';
        location.textContent = `Localização: ${character.location.name}`;
        
        const origin = document.createElement('p');
        origin.className = 'character-details';
        origin.textContent = `Origem: ${character.origin.name}`;
        
        info.appendChild(name);
        info.appendChild(status);
        info.appendChild(location);
        info.appendChild(origin);
        
        card.appendChild(image);
        card.appendChild(info);
        
        return card;
    }
    
    function showErrorMessage(message) {
        resultsContainer.innerHTML = '';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        const errorText = document.createElement('p');
        errorText.textContent = message;
        
        const errorImage = document.createElement('img');
        errorImage.src = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
        errorImage.alt = 'Rick frustrado';
        errorImage.style.width = '100px';
        errorImage.style.borderRadius = '50%';
        errorImage.style.margin = '10px auto';
        errorImage.style.display = 'block';
        
        errorDiv.appendChild(errorImage);
        errorDiv.appendChild(errorText);
        
        resultsContainer.appendChild(errorDiv);
    }
});
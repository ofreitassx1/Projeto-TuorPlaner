
const destinos = [
    {
        nome : "Rio de Janeiro",
        pais : "Brasil",
        categoria : "Nacional",
        arquivo : "rio.html",
        palavrasChaves: ["rio", "janeiro", "brasil", "nacional"]
    },

    {
        nome : "Salvador",
        pais : "Brasil",
        categoria : "Nacional",
        arquivo : "./viagens/salvador.html",
        palavrasChaves: ["salvador", "bahia", "brasil", "nacional"]
    }
]

// AGUARDANDO O CARREGAMENTO DA PAGINA
document.addEventListener('DOMContentLoaded', function(){
    const searchInput = document.querySelector('input[placeholder="Para onde deseja ir?"]');
    const searchButton = document.querySelector('.hero-text button');

    if (searchInput){
        // CRIA O CONTAINER PARA AS SUGESTOES DE VIAGENS
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'suggestions-container';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `
    

    //POSICIONA O INPUT RELATIVAMENTE PARA AS SUGESTOES
    searchInput.parentElement.style.position = 'relative'
    searchInput.parentElement.appendChild(suggestionsContainer);

    //FUNCAO PARA FILTRAR DESTINOS
    function filtrarDestinos(termo){
        if(!termo || termo.length < 2){
            return [];
        }

        const termoLower = termo.toLowerCase();
        return destinos.filter(destino => {
            return destino.palavrasChaves.some(palavra => 
                palavra.includes(termoLower)) || 
                destino.nome.toLocaleLowerCase().includes(termoLower);
        }).slice(0, 5); // LIMITA A 5 SUGESTOES

    }

    //MOSTRAR AS SUGESTOES
    function mostrarSugestões(sugestoes){
        suggestionsContainer.innerHTML = '';

        if(sugestoes.length === 0){
            suggestionsContainer.style.display = 'none';
            return;
        }


        sugestoes.forEach(destino => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.style.cssText = `
                padding: 10px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: background-color 0.2s;
            `;
            
            suggestionItem.innerHTML = `
                <strong style="color: black">${destino.nome}</strong><br>
                <small style="color: #666">${destino.pais} </small>
            `;

            //EVENTO DO HOVER
            suggestionItem.addEventListener('mouseenter', function(){
                this.style.backgroundColor = '#f0f0f0'
            });

            suggestionItem.addEventListener('mouseleave', function(){
                this.style.backgroundColor = 'white';
            });

            //EVENTO DE CLIQUE
            suggestionItem.addEventListener('click', function (){
                searchInput.value = destino.nome;
                suggestionsContainer.style.display = 'none';

                //NAVEGA PARA A PAGINA DE DESTINO
                window.location.href = destino.arquivo;
            });

            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = 'block';

    };

    //EVENT LISTENNER PARA O INPUT
    searchInput.addEventListener('input', function(){
        const termo = this.value.trim();
        const sugestoes = filtrarDestinos(termo);
        mostrarSugestões(sugestoes)
    });

    // EVENT LISTENER PARA O BOTAO DE PROCURAR
    if(searchButton){
        searchButton.addEventListener('click', function(){
            const termo = searchInput.value.trim();
            const sugestoes = filtrarDestinos(termo);
            
            if(sugestoes.length > 0){
                //VAI PARA O PRIMEIRO RESULTADO
                window.location.href = sugestoes[0].arquivo;

            } else {
                alert('Destino não encontrado. Tente Novamente!')
            }
        });
    }

    // EVENTE LISTENER PARA O ENTER INPUT
    searchInput.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            const termo = this.value.trim();
            const sugestoes = filtrarDestinos(termo);

            if(sugestoes.length > 0){
                window.location.href = sugestoes[0].arquivo;
            } else{
                alert('Destino não encontrado. Tente Novamente!')
            }
        }
    });

    //ESCONDE AS SUGESTOES AO CLICAR FORA
    document.addEventListener('click', function(e){
        if(!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)){
            suggestionsContainer.style.display = 'none';
        }
    });

    //EVENTO LISTENER PARA ESCONDER SUGESTOES AO PRESSIONAR ESCAPE
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
            suggestionsContainer.style.display = 'none';

        }
    });

    };

});
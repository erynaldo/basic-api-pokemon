let formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e){
    
    // Bloqueia o refresh da página
    e.preventDefault();
    
    // Url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    // Valor do input Name
    let nome = document.getElementById('name');

    // Concatena a url com o input name
    urlForm = urlForm + this.name.value;

    // Transforma o texto digitado em minusculo    
    urlForm = urlForm.toLocaleLowerCase()

    //Id imgPokemon
    let imagem = document.getElementById('imgPokemon');

    //Id Content
    let resposta = document.getElementById('content');

    //Resposta em HTML
    let html = '';

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function(data){
            console.log(data);
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Idade: ' + data.order + '<br>'
            html = html + 'Tipo: ' + maiuscula(data.types[0].type.name) + '<br>'
            html = html + 'Habilidade: ' + maiuscula(data.abilities[0].ability.name) + '<br>'
            resposta.innerHTML = html;

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" +
            data.sprites.front_shiny + "'><img src='" +
            data.sprites.back_default + "'>";
        })
        .catch(function(err){
            // console.log(err);
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokemon não encontrado! 🙁';
            } else {
                html = err;
            }
            resposta.innerHTML = html;
        })

    // alert(urlForm);
});

function maiuscula(valor) {
    return valor[0].toUpperCase() + valor.substr(1);
}
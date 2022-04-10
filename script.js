window.onload = () => {
    const submit = document.querySelector('.form_submit')
    submit.addEventListener('click', handler) //evento click e manda um callback chamado handler
}


function handler(e){
    e.preventDefault() //previne que o evento de clique mude a url

    //seleciona o que o usuário vai digitar
    let movie = document.querySelector('#name').value
    if(movie){
        //o que for digita em movie vai ser enviado para api
        const _url = `https://www.omdbapi.com/?s=${movie}&apikey=78f28eac` 
        const _options ={
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            cache: 'default'
        }
        //consumido a api com fetch
        fetch(_url, _options)
        //.then é utilizado para resgatar a promise/resposta
        .then((response)=>{
            //tratamento de erro
            if(!response.ok) throw new Error('Erro na requisição');

            //retornar o json que é o conteudo da api
            return response.json();
        })
        .then((dados) =>{
           //console.log(dados) //o arquivo json que foi retornado do primeiro then

            let conteudo = "" //variavel que vai que receber os conteudos
            
            //uma repetição para pegar os dados. Enquando o i for menor que a quantidade de dados ele vai fazer essa repetição e incrementar mais 1. (++)
            for(let i = 1; i < dados.Search.length; i++){
                conteudo += '<figure class="wrapper-banner">'
                conteudo += `<img class="banner" src="${dados.Search[i].Poster}"/>`
                conteudo += `<figcaption class="caption">${dados.Search[i].Title} (${dados.Search[i].Year})</figcaption>`
                conteudo += '</figure>'
        
            }
            document.getElementById('movies').innerHTML = conteudo
            
        })

    }else{
        alert('Type a name of a movie!')
    }
    

}


'use strict'

let carregando = false

function criarImagem(urlImagem){
    const galeria = document.getElementById('galeria')
    const foto = document.createElement('img')
    foto.src = urlImagem

    galeria.append(foto)
}

async function carregarFotos(){

    if (carregando) return // 🚫 evita duplicar

    const quantidade = document.getElementById('quantidade').value
    const galeria = document.getElementById('galeria')
    const botao = document.getElementById('pesquisar')

    // validação
    if (!quantidade || quantidade <= 0){
        galeria.innerHTML = "Digite um número válido ⚠️"
        return
    }

    carregando = true
    botao.disabled = true

    galeria.innerHTML = "🔄 Carregando..."

    try {
        galeria.replaceChildren()

        for (let i = 0; i < quantidade; i++) {
            const response = await fetch('https://randomfox.ca/floof/')
            const data = await response.json()

            criarImagem(data.image)
        }

    } catch {
        galeria.innerHTML = "❌ Erro ao carregar imagens"
    }

    carregando = false
    botao.disabled = false
}

document.getElementById('pesquisar')
.addEventListener('click', carregarFotos)

document.getElementById('quantidade')
.addEventListener('keydown', function(e){
    if (e.key === 'Enter'){
        e.preventDefault()
        carregarFotos()
    }
})
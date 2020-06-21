// Dados da entidade

function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')

    // A função fetch retorna um objeto promise, caso o objeto seja retornado com sucesso,
    // uma resposta será entregue e poderá ser acessada através da função then() que recebe uma função como parâmetro,
    // sendo responsável por converter e retonar a resposta em formato JSON, retornando assim outra promise
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") 
    .then(res => res.json())    // Convertendo e retornando a resposta em JSON
    .then(states => {   // Acessando o array de objetos
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){ // O parâmetro event faz referência com o evento change
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')
    
    const ufValue = event.target.value // A constante guarda o valor de um dos options do ufSelect, o armazenamento é realizado a cada execução do evento.  
    const indexOfSelectedState = event.target.selectedIndex // índice do estado selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text 
 
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {    
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities) // Quando o evento change for executado a função será disparada


// Itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle('selected')  // Adiciona a classe selected a elementos que não a possuem e remove de elementos que ja possuem

    const itemId = event.target.dataset.id

    // Verificando se existem itens selecionados, a função findIndex e aplicada sobre um array,
    // recebendo uma função como parâmetro, sendo responsável por verificar se determinado elemento está contido no array 
    // e retornando o índice desse respectivo elemento caso ele exista, caso contrário o valor retornado será -1
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    
    if(alreadySelected >= 0){ // Se ja estiver selecionado remover da seleção
        const filteredItems = selectedItems.filter( item => item != itemId) // Caso a condição seja atendida a constante reberá o elemento
        selectedItems = filteredItems
    } else { // Se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}


const content = document.querySelector('.content');
const aposteAgora = document.querySelector('#aposteAgora')
const btnVoltar = document.querySelector('#btnVoltar');
const container = document.querySelector('.container');
const ul = document.querySelector('#list');
const btnApostar = document.querySelector('#btnApostar');
const btnReset = document.querySelector('#btnReset');
const feedback = document.querySelector('.feedback');
const spanAcertos = document.querySelector('#acertos'); 
const spanErros = document.querySelector('#erros');
const spanContador = document.querySelector('#contador');
const spanRestante = document.querySelector('#restante')
const maxNumeros = 60
let arrSorteados = []
let arrEscolhidos = []  




//mostrar jogo
aposteAgora.addEventListener('click', ()=> {
 content.style.display = 'none'
 container.style.transform = 'translateX(0)'
})

//voltar a tela inicial
btnVoltar.addEventListener('click', ()=> {
 container.style.transform = 'translateX(-100vw)'
  content.style.display = 'block'
})

// ocultar feedback
function feedbackHidden() {
  feedback.style.display = 'none'
}
// mostrar feedback
function feedbackActive() {
   feedback.style.display = 'block'
}

// função para gerar li dinamicamente, é executada assim que a estrutura HTML estiver carregada no browser.(DOMContentLoaded)
function gerarLiDinamicamente() {
 let linha = document.createElement('div')
 linha.className = 'linha'

 for(let i = 1; i <= maxNumeros; i++){
  const li = document.createElement('li')
  li.innerText = i
  li.className = 'li-desmarcada'

  linha.appendChild(li)

  if(i % 10 === 0){
   ul.appendChild(linha)
   linha = document.createElement('div')
   linha.className = 'linha'
  }
 }
}

// função para sortear números de 1 á 60
function sortear() {
 const maximo = 60

 while(arrSorteados.length < 6){
  const numero = Math.floor(Math.random() * 61) 
  
  if(!arrSorteados.includes(numero)){
   arrSorteados.push(numero)
  }
 }
 feedbackHidden()
}

sortear()

// função para escolher números
ul.addEventListener('click', (e)=> {
 if(e.target.tagName === 'LI'){

 

  const alvo = e.target

  if(alvo.classList.contains('li-desmarcada')){
    if(arrEscolhidos.length >= 6){
      alert('Você ja escolheu todos os números.')
      return
    }
     spanContador.innerHTML = arrEscolhidos.length + 1
     spanRestante.innerHTML =  6 - arrEscolhidos.length -1
     
    alvo.classList.remove('li-desmarcada')
    alvo.classList.add('li-marcada')
    arrEscolhidos.push(Number(alvo.innerHTML))
    console.log(arrEscolhidos)
  }else{
    alvo.classList.remove('li-marcada');
    alvo.classList.add('li-desmarcada');
    const index = arrEscolhidos.indexOf(Number(alvo.innerHTML));

    if(index > -1){
      arrEscolhidos.splice(index, 1)
      console.log(arrEscolhidos)
    }
  }
 }
})
//botão para apostar
btnApostar.addEventListener('click', ()=> {

if(arrEscolhidos.length < 6){
  alert('Escolha todos os números.')
  return
}  

let acertos = 0
let erros = 0

for(let i = 0; i < arrSorteados.length; i++){
  if(arrSorteados.includes(arrEscolhidos[i])){
    acertos++
  }else{
    erros++
  }
}

spanAcertos.innerHTML = acertos
spanErros.innerHTML = erros

feedbackActive()


})


// reiniciar jogo 
btnReset.addEventListener('click', ()=> {
ul.innerHTML = ''
arrSorteados.length = 0
arrEscolhidos.length = 0

 spanContador.innerHTML = 0
 spanRestante.innerHTML =  6 

gerarLiDinamicamente()
feedbackHidden()
sortear()

console.log(arrSorteados)
})


window.addEventListener('DOMContentLoaded', gerarLiDinamicamente);

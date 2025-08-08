const ul = document.querySelector("#list");
let btnJogar = document.querySelector('#jogar');
const btnReset = document.querySelector('#reset')
const numeroAcertos = document.querySelector('#acertos');
const numeroErros = document.querySelector('#erros');
let feedback = document.querySelector('#feedback')
const qtd = document.querySelector('#qtd');
const falta = document.querySelector('#falta');
const reset = document.querySelector('#reset');
const maxNumeros = 25
let arrEscolhidos = [] 
let arrSorteados = []

if(arrEscolhidos.length < 15) btnJogar.disabled = true

// função para sortear 15 números entre 1 e 25
function sortearNumeros() {

 while(arrSorteados.length < 15){
  const numero = Math.floor(Math.random() * 25) + 1

  if(!arrSorteados.includes(numero)){
   arrSorteados.push(numero)
  }
 }
}

//função para criar li dinamicamente
function gerarLiDinamicamente() {
let linha = document.createElement('div');
linha.className = 'linha'

for(let i = 1; i <= maxNumeros; i++){
 const li = document.createElement('li');
 li.textContent = i
 li.className = 'desmarcada'
 linha.appendChild(li)

 linha.appendChild(li)

 if(i % 5 === 0){
  ul.appendChild(linha)
  linha = document.createElement('div');
  linha.className = 'linha'
 }

}
}
// evento na ul para saber qual li foi clicada
ul.addEventListener('click', (e)=> {

if(arrEscolhidos.length >= 15 && e.target.classList.contains('desmarcada')){
  alert('Você ja escolheu os 15 números.')
  return;
}  

 if(e.target.tagName === 'LI'){

  const numero = e.target.textContent

  e.target.classList.toggle('marcada')
  e.target.classList.toggle('desmarcada')



  if(!e.target.classList.contains('desmarcada')){
   arrEscolhidos.push(Number(numero))
   if(arrEscolhidos.length === 15) btnJogar.disabled = false
    console.log(arrEscolhidos)
  }else if(!e.target.classList.contains('marcada')) {
   const index = arrEscolhidos.indexOf(Number(numero))   
   if(index > -1){
   arrEscolhidos.splice(index, 1)
   console.log(arrEscolhidos)
   }
 
  }
  qtd.innerHTML = arrEscolhidos.length
  falta.innerHTML = 15 - arrEscolhidos.length
 }



})

// botão jogar
btnJogar.addEventListener('click', ()=> {
 if(arrEscolhidos.length < 15){
  alert('Escolhas os 15 números primeiro...');
  return
 }

 let acertos = 0
 let erros = 0

 for(let i = 0; i < arrEscolhidos.length ; i++){
  if(arrSorteados.includes(arrEscolhidos[i])){
   acertos++
  }else{
   erros++
  }
 }

numeroAcertos.innerHTML = 'Acertos: ' + acertos
numeroErros.innerHTML = 'Erros: ' + erros

verificarErrosESorteio()

arrSorteados.length = 0


})



//mostrar números sorteados e erros e acertos
function verificarErrosESorteio() {

ul.innerHTML = '' 

if(arrEscolhidos.length === 0) return 

let linha = document.createElement('div')
linha.className = 'linha'

for(let i = 0; i < arrEscolhidos.length; i++){

const li = document.createElement('li')
li.textContent = arrEscolhidos[i]

linha.appendChild(li)
arrEscolhidos.includes(arrSorteados[i]) ?  li.className = 'acertos' : li.className = 'erros'

if((i+1) % 5 === 0){
ul.appendChild(linha)
linha = document.createElement('div')
linha.className = 'linha'
}
}

btnJogar.disabled = true

statusBtn()

}

// mudar status do botão
function statusBtn() {
  if(btnJogar.disabled  ){
    btnJogar.classList.add('opacity');
    btnJogar.classList.remove('normal');
  } else {
    btnJogar.classList.remove('opacity');
    btnJogar.classList.add('normal');
  }
}



// botão resetar
btnReset.addEventListener('click', ()=> {
 arrEscolhidos.length = 0
 arrSorteados.length = 0
 ul.innerHTML = ''
 btnJogar.disabled = false 
 numeroAcertos.innerHTML = '' 
numeroErros.innerHTML = ''
 statusBtn()
 gerarLiDinamicamente()
 sortearNumeros()
})

window.addEventListener('DOMContentLoaded', sortearNumeros)
window.addEventListener('DOMContentLoaded', gerarLiDinamicamente)


const apostar = document.querySelector('#apostar')
const btnLimpar = document.querySelector('#reset')
const maxNumeros = 99
let arrEscolhidos =  []
let arrSorteados = []
const feedback = document.querySelector('.feedback')
feedback.style.display = 'none'
const ul = document.querySelector('#list');
const acertos = document.getElementById('acertos')
const erros = document.getElementById('erros')
const marcado = document.getElementById('marcado')
const falta = document.getElementById('falta')

//evento no botão apostar
apostar.addEventListener('click', ()=> {

if(arrEscolhidos.length < 50){
  alert('Primeiro escolha 50 números.')
  return
}  

let acertosJogo = 0
let errosJogo = 0

for(let i = 0; i < arrEscolhidos.length; i++){
  if(arrSorteados.includes(arrEscolhidos[i])){
    acertosJogo++
  }else{
    errosJogo++
  }
}

feedback.style.display = 'block'
acertos.innerHTML = acertosJogo
erros.innerHTML = errosJogo

mostrarResultados()

})
// resetar o jogo
btnLimpar.addEventListener('click',()=> {

  if(confirm('Deseja limpar sua aposta?')){
  arrEscolhidos.length = 0
  const li = document.querySelectorAll('li')
  li.forEach(ele => {
    ele.classList.remove('marcado')
    ele.classList.add('desmarcado')
  })
  }
  
  acertos.innerHTML = 0
  erros.innerHTML = 0
  marcado.innerHTML = 0
  falta.innerHTML = 50
 feedback.style.display = 'none'
 
  arrSorteados.length = 0
  sortearNumero()
  gerarLis()  

 

})


// gerar li dinamicamente uma ao lado da outra
function gerarLis() {

  ul.innerHTML = ''; // Limpa antes de gerar

  let linha = document.createElement('div');
  linha.className = 'linha';

  for (let i = 0; i <= maxNumeros; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    li.className = 'desmarcado';
    linha.appendChild(li);

    // Quando completar 10, adiciona a linha e inicia uma nova
    if ((i + 1) % 10 === 0) {
      ul.appendChild(linha);
      linha = document.createElement('div');
      linha.className = 'linha';
    }
    li.addEventListener('click', escolher)
  }

  // Se sobrar elementos (não múltiplos de 10), adiciona a última linha
  if (linha.children.length > 0) {
    ul.appendChild(linha);
  }


}

// funão que mercar o número e adiciona no array e desmarca o número e remove do array
function escolher(e){

if(arrEscolhidos.length >= 50){
  alert('Você ja escolheu todos os números')
  return
}



 const numero = Number(e.target.textContent)

  if(e.target.classList.contains('desmarcado')){
    arrEscolhidos.push(numero)
    e.target.classList.remove('desmarcado')
    e.target.classList.add('marcado')
  }else{
    e.target.classList.remove('marcado')
    e.target.classList.add('desmarcado')
    const index = arrEscolhidos.indexOf(numero)
    
    if(index > -1){
      arrEscolhidos.splice(index, 1)
      console.log(arrEscolhidos)
    }
  } 

marcado.innerHTML = arrEscolhidos.length
falta.innerHTML = 50 - arrEscolhidos.length
}

// função que sorteia 20 numeros entre 0 e 99
function sortearNumero(){

const maxNumeros = 20

while( arrSorteados.length < maxNumeros){
 
 const numero = Math.floor(Math.random() * 99) 

if(!arrSorteados.includes(numero)){
 arrSorteados.push(numero)
}
}
}
window.addEventListener('DOMContentLoaded', sortearNumero)
window.addEventListener('DOMContentLoaded', gerarLis)


function mostrarResultados() {
ul.innerHTML =''
let linha = document.createElement('div');
linha.className = 'linha'

for(let i = 0; i < arrEscolhidos.length; i++){
const li = document.createElement('li')
li.textContent = arrEscolhidos[i]
li.className = 'desmarcado'
linha.appendChild(li)

if(arrSorteados.includes(arrEscolhidos[i])){
  li.className = 'acertou'
}else{
  li.className = 'errou'
}

if((i+1) % 10 === 0){
ul.appendChild(linha)
linha = document.createElement('div')
linha.className = 'linha'
}
}


}
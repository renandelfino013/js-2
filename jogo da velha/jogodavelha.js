const prompt = require("prompt-sync")();
let sn = "s";
let jogo = true
let xouo;
let jogada=0;
function condicaodevitoria() {
  if (velha[0][0] === velha[0][1] && velha[0][1] === velha[0][2]) return true;
  if (velha[1][0] === velha[1][1] && velha[1][1] === velha[1][2]) return true;
  if (velha[2][0] === velha[2][1] && velha[2][1] === velha[2][2]) return true;

  if (velha[0][0] === velha[1][0] && velha[1][0] === velha[2][0]) return true;
  if (velha[0][1] === velha[1][1] && velha[1][1] === velha[2][1]) return true;
  if (velha[0][2] === velha[1][2] && velha[1][2] === velha[2][2]) return true;

  if (velha[0][0] === velha[1][1] && velha[1][1] === velha[2][2]) return true;
  if (velha[0][2] === velha[1][1] && velha[1][1] === velha[2][0]) return true;
  else {
    return false;
  }
}

function validarjogada() {
  let pos = jogada - 1;
  let linha = Math.floor(pos / 3);
  let coluna = pos % 3;
  if (velha[linha][coluna] == "x" || velha[linha][coluna] == "o") {
    return false;
  } else {
    return true;
  }
}
function Xo() {
  if (xouo == "x") {
    xouo = "o";
  } else {
    xouo = "x";
  }
}
function registrarjogada() {
  let pos = jogada - 1;
  let linha = Math.floor(pos / 3);
  let coluna = pos % 3;

  velha[linha][coluna] = xouo;
  return true;
}

function mostrartabuleiro() {
  console.clear;
  c = jogada;
  for (l = 0; l <= 2; l++) {
    let linha = "";

    for (c = 0; c <= 2; c++) {
      linha += velha[l][c] + "|";
    }
    console.log(linha);
    if (l < 2) {
      console.log("---------");
    }
  }
}
while (jogo == true) {
velha = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
let l = 0;
let c = 0;
let partidaativa = true;
let cont = 0;


xouo = "x";

while(partidaativa==true){
   
      console.clear();
      mostrartabuleiro();

     jogada = Number(prompt(`vai jogar ${xouo} em q casa: `));
      console.log(``);

      if (validarjogada()) {
        registrarjogada();
        cont++;   
        if (condicaodevitoria()) {
          console.clear();
          mostrartabuleiro();
          console.log(`o jogador ${xouo} ganhou a partida`)
          sn=prompt(`quer continuar? s/n: `);
            if (sn=="s"){
              partidaativa=false
              
             
            }
            else{
              jogo=false
              partidaativa=false
              
            }
            
            
        } 
        if (cont === 9) {
          console.clear();
          mostrartabuleiro();  
          console.log("jogo empatado, deu velha");
            
            sn=prompt(`quer continuar? s/n: `);
            if (sn=="s"){
              partidaativa=false
              break
              
            }
            else{
              jogo=false
              partidaativa=false
              break
            }
          }

        Xo();
      } else {
        console.log("ERROR: jogada invalida");

        continue;
      
    }
  }}
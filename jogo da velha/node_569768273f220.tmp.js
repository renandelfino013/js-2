const prompt = require("prompt-sync")();
velha = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
let l = 0;
let c = 0;
let sn = "s";
let xouo;
let jogada
xouo = "x";
function Xo() {
  if (xouo == "x") {
    xouo = "o";
  }
  else{
    xouo=="x"

  }
}
function registrarjogada() {
  if (jogada <= 3) {
    c = jogada-1;
    velha[1, c] = xouo;
  }
}

function mostrartabuleiro() {
  console.clear;
  c=jogada
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
while (sn == "s") {
  mostrartabuleiro();

  jogada = Number(prompt(`vai jogar ${xouo} em q casa: `));
  console.log(``);
  sn = prompt("deseja continuar jogando s/n: ");
  
  registrarjogada();
  Xo();
}

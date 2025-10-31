
const prompt = require('prompt-sync')();
let n1=Number(prompt("digite o 1 numero: "));
let n2=Number(prompt("digite o 2 numero: "));

let operacao=(prompt(`qual a operaçao q vfc deseja fazer?[+][-][/][%][*] `))
let resultado=n1+n2
console.log(`os numero digitados foram ${n1} e ${n2}`)
if(operaçao==='+'){
    resultado=n1+n2
}
    else if(operacao==="-"){
    resultado=n1-n2
}
else if(operacao==="*"){
    resultado===n1*n2
}
else if(operacao==="/"){
    resultado===n1/n2
}


console.log(`a soma entre os numeros é ${resultado}`);
const prompt = require("prompt-sync")();
let opçao;
let nome= "";

let anos=0;
let conta =[];
let l;
let depositar;
let qualid;
let saque
let contalogada= "";


class contas {
 static proximoid=1;

    constructor(titular="", idade,senha=""){
  
   
    this.id=contas.proximoid++;
    this.titular=titular;
    this.idade=idade;
    this.saldo=0;
    this.senha=senha;


}

    
    info(){
        console.log(`nome: ${this.titular}`)
        console.log(`idade: ${this.idade}`)
        console.log(`id: ${this.id}`)
    }
}
function trasferir(idd,valor,s){
let achado = conta.find(c=> c.id===idd && c.senha===s)
if(!achado) 
   {
    console.log("conta n encontrada!")
   }
    else if (contalogada.saldo>valor){
       contalogada.saldo-=valor
        achado.saldo+=valor
       console.log(`transferencia realizada com sucesso! seu novo saldo é ${contalogada.saldo}`) 

}
else{
    console.log("saldo insuficiente!")
}
}
function deposite(idd, valor,){
 let achado= conta.find(c=> c.id===idd)
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else {
    contalogada=achado
    achado.saldo+=valor
    console.log(`deposito realizado com sucesso! seu novo saldo é ${achado.saldo}`)
      
   }
}


function buscarid(idd,nome,senha){

   let achado= conta.find(c=> c.id===idd && c.titular===nome&&c.senha===senha)
   if(!achado) 
   {
    console.log("senha ou nome de usuatio incorretos!!")
   }
   else{
    console.log(achado)
    contalogada=achado  
   }
}

function sacar(idd,valor,senha){
let achado= conta.find(c=> c.id===idd && c.senha===senha) 
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else if(achado.saldo>valor){
    achado.saldo-=valor
    console.log(`saque realizado com sucesso!, seu novo saldo é ${achado.saldo}`)
      
   }
   else{
    console.log("saldo insuficiente!")
   }

}

function criarconta(){
nome=prompt(`qual seu nome? `)
anos=Number(prompt(`quantos anos vc tem? `))
senha=prompt(`crie uma senha para sua conta: `)
c=conta.push( new contas(nome,anos,senha))
l=conta.length-1

contalogada=conta[l];
console.log(`conta criada com sucesso!`)
console.log(`bem vindo ${conta[l].titular} vc tem ${conta[l].idade} anos seu id é ${conta[l].id}`)}

while(opçao!=0){
    console.log(`bem vindo ao seu banco ${contalogada.titular} `)
    console.log("---------------------------")
    console.log("1-criar conta")
    console.log("2-acessar conta")
    console.log("3-depositar")
    console.log("4-sacar")
    console.log("5-trasferir")
    console.log("0-sair")
    opçao=Number(prompt("escolha uma opçao: "))
    if(opçao==1){
    criarconta()
}
else if(opçao==2){
let idbusca= Number(prompt("qual o id da sua conta? "))
let nomebusca= prompt("qual o nome do titular da conta? ")
let senhabusca= prompt("qual a senha da conta? ")
buscarid(idbusca,nomebusca,senhabusca)
}
else if (opçao==3){
qualid= Number(prompt("qual o id da conta que vc quer depositar? "))
depositar= Number(prompt("quanto vc quer depositar? "))
deposite(qualid, depositar)
}
else if(opçao==4){
    let idd= Number(prompt("qual o id da sua conta? "))    
    saque= Number(prompt("quanto vc quer sacar? "))
    let confirsenha= prompt("qual a senha da conta? ")
    sacar(idd,saque,confirsenha)
}
else if(opçao==5){
let chave = Number(prompt("qual o id da conta q vc deseja transferir? "))
let valor= Number(prompt("qual o valor da transferencia? "))
let senha= prompt("qual a senha da sua conta? ")
    trasferir(chave,valor,senha)}





}
console.log(conta)
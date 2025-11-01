const prompt = require("prompt-sync")();
let opçao;
let nome= "";
let anos=0;
let conta =[];
let l;
let depositar;
let qualid;
let saque


class contas {
 static proximoid=1;

    constructor(titular="", idade){
  
   
    this.id=contas.proximoid++;
    this.titular=titular;
    this.idade=idade;
    this.saldo=0;


}

    
    info(){
        console.log(`nome: ${this.titular}`)
        console.log(`idade: ${this.idade}`)
        console.log(`id: ${this.id}`)
    }
}

function deposite(idd, valor){
 let achado= conta.find(c=> c.id===idd)
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else{
    achado.saldo+=valor
    console.log(`deposito realizado com sucesso! seu novo saldo é ${achado.saldo}`)
      
   }
}


function buscarid(idd){

   let achado= conta.find(c=> c.id===idd)
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else{
    console.log(achado)   
   }
}

function sacar(idd,valor){
let achado= conta.find(c=> c.id===idd)
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else{
    achado.saldo-=valor
    console.log(`saque realizado com sucesso!, seu novo saldo é ${achado.saldo}`)
      
   }

}

function criarconta(){
nome=prompt(`qual seu nome? `)
anos=Number(prompt(`quantos anos vc tem? `))
conta.push( new contas(nome,anos))
l=conta.length-1
console.log(`conta criada com sucesso!`)
console.log(`bem vindo ${conta[l].titular} vc tem ${conta[l].idade} anos seu id é ${conta[l].id}`)}

while(opçao!=5){
    console.log("bem vindo ao seu banco")
    console.log("---------------------------")
    console.log("1-criar conta")
    console.log("2-acessar conta")
    console.log("3-depositar")
    console.log("4-sacar")
    console.log("5-sair")
    opçao=Number(prompt("escolha uma opçao: "))
    if(opçao==1){
    criarconta()
}
else if(opçao==2){
let idbusca= Number(prompt("qual o id da sua conta? "))
buscarid(idbusca)
}
else if (opçao==3){
qualid= Number(prompt("qual o id da conta que vc quer depositar? "))
depositar= Number(prompt("quanto vc quer depositar? "))
deposite(qualid, depositar)
}
else if(opçao==4){
    let idd= Number(prompt("qual o id da sua conta? "))    
    saque= Number(prompt("quanto vc quer sacar? "))
    sacar(idd,saque)
}
console.log(conta)


}
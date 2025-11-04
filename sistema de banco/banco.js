const prompt = require("prompt-sync")();
let opçao;
let opçao2;
let nome= "";

let anos=0;
let conta =[];
let l;
let depositar;
let qualid;
let saque
let contalogada=null;



class contas {
 static proximoid=1;

    constructor(titular="", idade,senha=""){
  
   this.extrato=[];
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
    else if (contalogada.saldo>=valor){
       contalogada.saldo-=valor
        achado.saldo+=valor
        contalogada.extrato.push({
            tipo:"Transferencia",
            de:contalogada.titular,
            valor:valor,
            data: new Date().toLocaleString()
        })
        achado.extrato.push({
            tipo:"Transferencia",
            valor:valor,
            data: new Date().toLocaleString()
        })
       console.log(`transferencia realizada com sucesso! seu novo saldo é ${contalogada.saldo}`) 

}
else{
    console.log("saldo insuficiente!")
}
}
function deposite( valor){
 let achado= contalogada
   
    console.clear()
    achado.saldo+=valor
    contalogada.extrato.push({
        tipo:"Deposito",
        valor:valor,
        data: new Date().toLocaleString()
    })
    console.log(`ola! ${contalogada.titular}`)
    console.log(`deposito realizado com sucesso! seu novo saldo é ${achado.saldo}`)
      
   }



function buscarid(idd,nome,senha){

   let achado= conta.find(c=> c.id===idd && c.titular===nome&&c.senha===senha)
   if(!achado) 
   {
    console.log("senha ou nome de usuatio incorretos!!")
    return false
   }
   else{
    console.log(achado)
    contalogada=achado  
    return true
   }
}

function sacar(valor,senha){
let achado= conta.find(c=> c.senha===senha) 
   if(!achado) 
   {
    console.log("conta n encontrada!")
   }
   else if(achado.saldo>=valor){
    achado.saldo-=valor
   contalogada.extrato.push({
    tipo: "saque",
    valor:valor,
    data: new Date().toLocaleString(),
   })

    
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
console.log(`bem vindo ${conta[l].titular} vc tem ${conta[l].idade} anos seu id é ${conta[l].id}`)
return true
}
function menuconta(){
while (opçao2!=0){
console.log("1-depositar")
    console.log("2-sacar")
    console.log("3-trasferir")
    console.log("4-extrato")
    console.log("0-sair")
    opçao2=Number(prompt("escolha uma opçao: "))
    
if(opçao2==0){
    contalogada=null
    console.log("volte sempre!")
    
    menuprincipal()
    break
    
}
else if (opçao2==1){

depositar= Number(prompt("quanto vc quer depositar? "))
deposite(depositar)
}
else if(opçao2==2){
    console.clear()
      
    saque= Number(prompt("quanto vc quer sacar? "))
    let confirsenha= prompt("qual a senha da conta? ")
    sacar(saque,confirsenha)
}
else if(opçao2==3){
    console.clear()
let chave = Number(prompt("qual o id da conta q vc deseja transferir? "))
console.log(`saldo atual: ${contalogada.saldo}`)
let valor= Number(prompt("qual o valor da transferencia? "))
let senha= prompt("qual a senha da sua conta? ")
    trasferir(chave,valor,senha)}

else if (opçao2==4){
    console.log(`extrato da conta de ${contalogada.titular}`)
    console.log(`saldo atual: ${contalogada.saldo}`)
    for(let movi of contalogada.extrato){
        console.log(`${movi.data} | ${movi.tipo} de ${movi.valor}`)
    }


}



}

}

function menuprincipal(){
    opçao2=-1
while(opçao!=0){
    if(opçao==0){
        console.log("volte sempre!")
        console.log(conta)
        
        break
        return false
        
    }

    console.log(`bem vindo ao NU-no-banko`)
    console.log("---------------------------")
    console.log("1-criar conta")
    console.log("2-acessar conta")
    console.log("0-sair")
    opçao=Number(prompt("escolha uma opçao: "))
    if(opçao==1){
    if(criarconta()){
        console.clear()
        console.log(`bem vindo ${contalogada.titular}`)
        menuconta()
        
    }
}
else if(opçao==2){
let idbusca= Number(prompt("qual o id da sua conta? "))
let nomebusca= prompt("qual o nome do titular da conta? ")
let senhabusca= prompt("qual a senha da conta? ")
if(buscarid(idbusca,nomebusca,senhabusca)){
    console.clear()
    console.log(`bem vindo de volta ${contalogada.titular}`)
    menuconta()
}
}}}

    if (menuprincipal()){

    }
    else{
console.log(conta)}

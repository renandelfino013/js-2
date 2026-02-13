const prompt = (require("prompt-sync")());
let tarefa = [];
let opcao = undefined;
class tarefas {
    static proximoid = 1;
    
constructor(nometarefa = "",descricao = "", estado,criado){
    
this.nometarefa = nometarefa
this.descrição = descricao
this.id = tarefas.proximoid++ 
this.estado = estado
this.criado= criado
}







}
function mostratarefas(){
    for(let i = 0 ;  i < tarefa.length; i++){
        console.log(`ID `,tarefa[i].id,`nome: `,tarefa[i].nometarefa,` concluida? `, tarefa[i].estado  )
    }

}
function criartarefa(){
let data= new Date().toLocaleDateString("pt-br")

 let mome = false
 
let nometarefa= prompt("nome da tarefa?: ")
let descrição = prompt("oq diz sobre sua tarefa: ")
criartaref = tarefa.push(new tarefas(nometarefa,descrição,mome,data) )
console.clear() 
console.log(`tarefa criada com sucesso!`)}


function remove(){
let qual = prompt("qual id da tarefa q vc deseja remover")
const revove = tarefa.splice (qual-1, 1) 



}
function resetarid(){
  for (let i = 0; i < tarefa.length; i++) {
    tarefa[i].id = i + 1 ;  


}}
function check(){
        let idd = Number(prompt("qual o id da tarefa que vc deseja concluir? "))
        idd = idd -1 
        tarefa[idd].estado = true


    
}


while(opcao !== 0  ){
    mostratarefas()
    console.log(`bem vindo ao seu to do list`)
console.log(`-----------------------------`)
console.log(`deseja criar uma tarefa? [1]`)
console.log(`deseja concluir uma tarefa? [2]`)
console.log("deseja remover alguma tarefa? [3]")
opcao = prompt(Number)
if(opcao == 1 ){
    console.clear()
    
    criartarefa()
    resetarid()
}
else if(opcao == 2){
    check()
}
else if (opcao == 3){
    remove()
    resetarid()
}
}


    



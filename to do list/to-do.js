const prompt = require("prompt-sync")();
let tarefas = [];
let opçao ;
const adicionartarefa = ()=>
    {
    tarefa=prompt("digite a tarefa!: ")
    tarefas.push(tarefa)
    
    
    }
        const mostrartarefas = () => {
      for (let c = 0; c < tarefas.length; c++) {
        console.log(`${c + 1} ` + tarefas[c]);
      }
    };
    const removertarefa=()=>{
        let eli= prompt("qual tarefa vc deseja remover?[num] ");
        let o=eli-1; 
        if(o>=0 && o<tarefas.length){
       
         tarefas.splice(o,1)  
        }
        else{
            console.log("indice invalida")
        }
        
         
        
    }
while(opçao!= 3){
    
    console.clear();
    console.log("Bem vindo ao seu gerenciador de tarefas!");
    console.log("=====================================");
    mostrartarefas();
    console.log("-------------------------------------")
    console.log("[1] Adicionar tarefa");
    console.log("[2] remover tarefa");
    console.log("[3] Sair");
    opçao = prompt("oq vc deseja fazer? ");
    if(opçao==1){
    adicionartarefa()
    }
    else if(opçao==2){
        removertarefa()
    }
}
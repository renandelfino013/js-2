class Tarefa{ 
  constructor(nometarefa,estado,data){
    this.nometarefa=nometarefa;
    this.estado=estado;
    this.data=data;

  }

}
let tarefas = [];


function adicionarTarefa(e){
  e.preventDefault(); // Impede o envio padrão do formulário
  const newtarefa = new Tarefa (tarefaInput.value)
  tarefa = tarefa.push(newtarefa)


}



const form = document.querySelector("form");
const lista = document.querySelector("ul");
const tarefaInput = document.getElementById('tarefa');
let enviar = getElementById("submit")


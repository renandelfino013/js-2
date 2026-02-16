
class Tarefa{ 
  constructor(nometarefa,estado,data){
    this.nometarefa=nometarefa;
    this.estado=estado;
    this.data=data;

  }

}
let tarefas = [];

const form = document.querySelector("form");
const lista = document.querySelector("ul");
const tarefaInput = document.getElementById('tarefa');


render()
function render(){

  const tarefasSalvas = localStorage.getItem("tarefas");
if (tarefasSalvas) {
  tarefas = JSON.parse(tarefasSalvas);
}

  for (const item of tarefas){
    let li = document.createElement("li")
    li.textContent = item.nometarefa
    lista.appendChild(li)

  }
}



function adicionarTarefa(){
  const newtarefa = tarefas.push (new Tarefa (tarefaInput.value))
  console.log(tarefas)
   let lis = document.createElement("li")
    lis.textContent = tarefaInput.value
    lista.appendChild(lis)

  form.reset()
  
localStorage.setItem("tarefas" , JSON.stringify(tarefas))
}


form.addEventListener('submit' , (e) =>{
  e.preventDefault(); // Impede o envio padrão do formulário

 adicionarTarefa()
 




} )



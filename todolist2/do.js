class Tarefa {
  constructor(nometarefa, estado, data) {
    this.nometarefa = nometarefa;
    this.estado = estado;
    this.data = data;
  }
}
let tarefas = [];

const form = document.querySelector("form");
const lista = document.querySelector("ul");
const tarefaInput = document.getElementById("tarefa");
const addButton = document.getElementById("add");
const h3 = document.getElementById("h3");
const listaTarefas = document.getElementById("listatarefas");
render();
function render() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
  }

  for (const item of tarefas) {
    let li = document.createElement("li");
    li.classList.add("tarefa-item");

    li.textContent = item.nometarefa;

    lista.appendChild(li);
  }
  if (tarefasSalvas == false || tarefasSalvas == null) {
listaTarefas.classList.add("listavazia");
h3.classList.add("listavazia")  }
}

function adicionarTarefa(item,lis) {
  if (item.value === "") {
    alert("Digite uma tarefa válida!");
    return;
  } else {
    const newtarefa = new Tarefa(item.value);
    tarefas.push(newtarefa);

    console.log(tarefas);
    lis.textContent = item;
    lis.classList.add("tarefa-item");

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
}
addButton.classList.add("add-button");
addButton.addEventListener("click", (e) => {
  let lis = document.createElement("li");
  let input = document.createElement("input");
  input.classList.add("inputtarefa");
  input.type = "text";
  input.placeholder = "Digite sua tarefa aqui";

  lis.classList.add("tarefa-item");
   lista.appendChild(lis);
      lis.appendChild(input);
      input.focus();


      

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (input.value.trim() === "") {
        alert("Digite uma tarefa válida!");
      } else {
        

        adicionarTarefa(input,lis);
     
      }

      
    }
  });
});
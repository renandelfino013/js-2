
class Tarefa {
  constructor(nometarefa, estado, data, id) {
    this.nometarefa = nometarefa;
    this.estado = estado;
    this.data = data;
    this.id = Date.now();
  }
}
let tarefas = [];

const lista = document.querySelector("ul");
const addButton = document.getElementById("add");
const h3 = document.getElementById("h3");
const listaTarefas = document.getElementById("listatarefas");

render();
function render() {
  const tarefasSalvas = localStorage.getItem("tarefas");

  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
  }
  lista.innerHTML = "";
  for (const item of tarefas) {
    let li = document.createElement("li");
    
    let removebutton = document.createElement("button");
    let span = document.createElement("span");

    removebutton.textContent = "X"; 
    removebutton.classList.add("remove-button");
    removebutton.addEventListener("click", (e) => {
      tarefas = tarefas.filter((t) => t.id !== item.id);

      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      render()
    });
    li.classList.add("tarefa-item");

    span.textContent = item.nometarefa;

    li.appendChild(removebutton);
    
    lista.appendChild(li);
    span.textContent = item.nometarefa;
    li.appendChild(span);

     span.addEventListener("click", (e) => {
      span.value = "";
   span.contentEditable = true;
      e.preventDefault();

   span.focus();
    
      
  });
  span.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (span.textContent.trim() === "") {
        alert("Digite uma tarefa válida!");
        
      return;
      } 
      
        span.focus(); 
      span.contentEditable = false;
      item.nometarefa = span.textContent;
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }}

  ); 
  }
  console.log(tarefas);
  if (tarefasSalvas == false || tarefasSalvas == null) {
    listaTarefas.classList.add("listavazia");
    h3.classList.add("listavazia");
  }
}

function adicionarTarefa(item, lis) {
  if (item.value === "") {
    alert("Digite uma tarefa válida!");
    return;
  } else {
    const newtarefa = new Tarefa(item.value, "pendente", new Date());

    tarefas.push(newtarefa);

    lis.classList.add("tarefa-item");

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
    console.log(tarefas);
  }
}


addButton.classList.add("add-button");
addButton.addEventListener("click", (e) => {
  lista.classList.remove("listavazia");
  h3.classList.remove("listavazia");
  console.log(tarefas);
  let lis = document.createElement("li");
  let input = document.createElement("input");
  input.classList.add("inputtarefa");
  input.type = "text";
  input.placeholder = "Digite sua tarefa aqui";
  input.name = "tarefa";

  lis.classList.add("tarefa-item");
  lista.appendChild(lis);
  lis.appendChild(input);
  input.focus();

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (input.value.trim() === "") {
        alert("Digite uma tarefa válida!");
      } else {
        adicionarTarefa(input, lis);
      }
    }
  }

);
});
//localStorage.clear()

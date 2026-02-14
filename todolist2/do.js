let tarefa = [];

class tarefas {
  static proximoid = 1;

  constructor(nometarefa = "", descricao = "", estado = false, criado) {
    this.nometarefa = nometarefa;
    this.descrição = descricao;
    this.id = tarefas.proximoid++;
    this.estado = estado;
    this.criado = criado;
  }
}

function criartarefa() {
  let data = new Date().toLocaleDateString("pt-br");

  let mome = false;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let tarefainput = form.tarefa.value;
    if (tarefainput === "") return;
    const lis = document.createElement("li");
    const botao = document.createElement("button")
    const check = document.createElement("button")

    botao.textContent = "remove?"
    check.textContent = "Check?"
    botao.addEventListener ("click" , (b) =>{
         const id = Number (lis.dataset.id)
        tarefa = tarefa.filter( t => t.id !== id)
        lis.remove()
        


    })
    check.addEventListener("click", (c) => {
        const id = Number(lis.dataset.id)
        let tarefaatual = tarefa.find(t =>t.id === id )
       
     tarefaatual.estado = !tarefaatual.estado
     if(tarefaatual.estado === true){
        check.textContent = "✅"
        lis.classList.add("concluida")
    }
        else{
            check.textContent = "❌"
            lis.classList.remove("concluida")
        }
        
        console.log(tarefa)

    } )
    
    lis.textContent = tarefainput
    
  
    lista.appendChild(lis)
      lis.appendChild(botao)
      lis.appendChild(check)
    
    form.reset()
    
    criartaref = new tarefas(tarefainput)
    tarefa.push(criartaref)
    lis.dataset.id = criartaref.id
  });
}
let form = document.querySelector("form");
let lista = document.querySelector("ul");
criartarefa()

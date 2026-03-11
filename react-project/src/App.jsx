import { useEffect, useState } from 'react' 
function App(){
  let [mostrarinput , setmostrarinput] = useState(false)
  let [mostrarprojetos,setmostrarprojetos] = useState(false)
  let [texto , settexto] = useState("")
  let [projetos,setprojetos] = useState([])
  let [tarefas,settarefas] = useState([])
  let [projetoSelecionado, setProjetoSelecionado] = useState(null)
useEffect(() => {
  chamarapi()
}, [])


  async function  chamarapi(){
    let resp = await fetch("/projetos")
    let dados = await resp.json()
    setprojetos(dados)


  }
  function mudartexto(e){
    settexto(e.target.value)

  }
  async function tarefasprojeto(id){
    let resp= await fetch(`/projetos/${id}/listartarefas`)
    let tarefas = await resp.json()
    settarefas(tarefas)
    setProjetoSelecionado(id)
    return (tarefas.map((tarefa) =>{
     return( <li key={tarefa.id}>{tarefa.nome} {tarefa.estado} {tarefa.criadoem}</li>
    )
    }))
  }
 function Mylista() {
  return (

      <ul className='listas'>
        {projetos.map((projeto) => (
           <li key={projeto.id}>
            <div onClick={() => tarefasprojeto(projeto.id)} className='projeto'>
             <h3> {projeto.nome}</h3>
             <p>{}</p>
            {projetoSelecionado === projeto.id && (
              <ul id='listatarefas'>
                {tarefas.map((tarefa) => (
                  <li key={tarefa.id}>
                    {tarefa.nome} {String(tarefa.estado)} {new Date(tarefa.criadoem).toLocaleString("pt-BR")}
                  </li>
                  
                ))}
              </ul>
              
            )}
            </div>
          
          </li>
          
        ))}
      </ul>
  )
}   
function mostrar(){
  setmostrarprojetos(!mostrarprojetos)
}
  function inputtext(){
    setmostrarinput(!mostrarinput)
    
  }
  function addprojeto(){
    setprojetos([...projetos,texto])
    
    return 
  }
  function Mybutton(props){
    return <button onClick={inputtext}> {props.children} </button>
  }
 return (
  <div id='main'>
    <div id="conteudo">
    <Mybutton >+</Mybutton>
    {mostrarinput && < input type="text" onChange={mudartexto} onKeyDown = {(e)=>{
      if(e.key == "Enter"){
        addprojeto()
        console.log(projetos)
      } 


    }} /> }
    
    <Mylista></Mylista>
    </div>
    
    </div>
 )
}


export default App
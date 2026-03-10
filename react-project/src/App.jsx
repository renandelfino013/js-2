import { useEffect, useState } from 'react' 
function App(){
  let [mostrarinput , setmostrarinput] = useState(false)
  let [texto , settexto] = useState("")
  let [projetos,setprojetos] = useState([])
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
 function Mylista() {
  return (
    <ul>
      {projetos.map((projeto) => (
        <li key={projeto.id}>{projeto.nome} {projeto.estado}</li>
      ))}
    </ul>
  )
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
  <div>
    <Mybutton >+</Mybutton>
    {mostrarinput && < input type="text" onChange={mudartexto} onKeyDown = {(e)=>{
      if(e.key == "Enter"){
        addprojeto()
        console.log(projetos)
      } 


    }} /> }
    
    <Mylista></Mylista>
    </div>
 )
}


export default App
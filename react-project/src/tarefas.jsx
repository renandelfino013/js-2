import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function Home() {
   let token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
       return <Navigate to="/" replace />;
    }
  let [mostrarinput, setmostrarinput] = useState(false);
  let [mostrarprojetos, setmostrarprojetos] = useState(false);
  let [texto, settexto] = useState("");
  let [nometarefa, setnometarefa] = useState("");
  let [adionandotarefa, setadioconandotarefa] = useState(null);
  let [projetos, setprojetos] = useState([]);
  let [tarefas, settarefas] = useState([]);
  let [projetoSelecionado, setProjetoSelecionado] = useState(null);
  let [clicado, setclicado] = useState("");
  let [textoedicao, settextoedicao] = useState("");
  let [editandoid, seteditandoid] = useState(null);

  useEffect(() => {
    chamarapi();
  }, []);

  async function chamarapi() {
 
    try {
    let resp = await fetch("/projetos", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
    let dados = await resp.json();
    setprojetos(dados);}
    catch(error){
      console.error("Erro ao buscar projetos:", error);
    }
  }

  function mudartexto(e) {
    settexto(e.target.value);
  }

  async function tarefasprojeto(id) {
    let resp = await fetch(`/projetos/${id}/listartarefas`);
    let tarefas = await resp.json();
    settarefas(tarefas);
    setProjetoSelecionado(id);
    console.log(tarefas);

    return tarefas.map((tarefa) => {
      return (
        <li key={tarefa.id}>
          {tarefa.nometarefa} {tarefa.estado} {tarefa.criado_em}
        </li>
      );
    });
  }

  function verificarestado(estado) {
    if (estado === true) {
      estado = "ativo";
      setverifyestado(estado);
    }
  }

  async function mudarnome(id) {
    let resp = await fetch(`/projetos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: `${textoedicao}`,
      }),
    });

    if (resp.ok) {
      await chamarapi();
      seteditandoid(null);
      settextoedicao("");
    }
  }

  async function adiocionartarefa(id, nome) {
    let resp = await fetch(`/projetos/${id}/tarefas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: `${nome}`,
      }),
    });
    if(resp.ok){
      setadioconandotarefa(null)
      await tarefasprojeto(id)
      await chamarapi()
    }
  }

  async function deleteprojeto(id) {
    let resp = await fetch(`/projetos/${id}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      await chamarapi();
    }
  }

  function Mylista() {
    return (
      <ul className="listas">
        {projetos.map((projeto) => (
          <li key={projeto.id} className="lip">
            <div onClick={() => tarefasprojeto(projeto.id)} className="projeto">
              <div className="divtitulo">
                {editandoid === projeto.id ? (
                  <input
                    className="inputtitulo"
                    type="text"
                    value={textoedicao}
                    autoFocus
                    onChange={(e) => settextoedicao(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => mudarnome(projeto.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        mudarnome(projeto.id);
                      }
                      if (e.key === "Escape") {
                        seteditandoid(null);
                        settextoedicao("");
                      }
                    }}
                  />
                ) : (
                  <h3
                    className="tituloprojeto"
                    onClick={(e) => {
                      e.stopPropagation();
                      seteditandoid(projeto.id);
                      settextoedicao(projeto.nome);
                    }}
                  >
                    {projeto.nome}
                  </h3>
                )}

                <h3 className="estadoprojeto">
                  {projeto.estado ? "ativo" : "inativo"}
                </h3>
              </div>

            

              {projetoSelecionado === projeto.id && (
                <ul id="listatarefas">
                  {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="litarefa">
                      <div className="divtitulo">
                      <p className="txttarefa">
                       
              <span className="nometarefa">{tarefa.nometarefa}</span>
                <span className="statustarefa">a fazer</span>
</p>

                        <div className="direitatarefa">
                          <p className="data">
                            {new Date(tarefa.criado_em)
                              .toLocaleString("pt-BR", {
                                month: "2-digit",
                                year: "numeric",
                                day: "2-digit",
                              })
                              .replaceAll("/", "-")}
                          </p>

                          <button onClick={()=>{
                            deletartare(tarefa.id)
                          }} className="buttondeletetarefa"></button>
</div>
                      </div>
                
                    </li>
                  ))}
                </ul>
              )}
                {adionandotarefa === projeto.id ? (
                <input
                className="inputtarefa"
                  type="text"
                  autoFocus
                  value={nometarefa}
                  onChange={(e) => setnometarefa(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={() => adiocionartarefa(projeto.id, nometarefa)}
                   onKeyDown={async (e)   =>  {
                      if (e.key === "Enter") {
                        adiocionartarefa(projeto.id, nometarefa);
                        await chamarapi()
                      }
                      if (e.key === "Escape") {
                        setadioconandotarefa(null);
                        setnometarefa("");
                      }
                    }}
                />
                
              ) : (
                <p
                  className="pp"
                  onClick={() => {
                    setadioconandotarefa(projeto.id);
                  }}
                >
                  +
                </p>
              )}
            </div>

            <button
              className="buttondelete"
              onClick={() => {
                deleteprojeto(projeto.id);
              }}
            ></button>
          </li>
        ))}
      </ul>
    );
  }
  async function deletartare(id) {
    let resp = await fetch(`/tarefas/${id}`,
      {method:"DELETE",headers:{"Content-Type":"application/json"}}
    )
    if(resp.ok){
      await chamarapi()
    }
  }
  function mostrar() {
    setmostrarprojetos(!mostrarprojetos);
  }

  function inputtext() {
    setmostrarinput(!mostrarinput);
  }

  async function addprojeto() {
    const resp = await fetch("/projetos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: `${texto}`,
      }),
    });

    let dados = await resp.json();
    setprojetos([...projetos, dados]);
    return chamarapi();
  }

  function Mybutton(props) {
    return (
      <button
        className={clicado ? "buttonb" : "botaodesativado"}
        onClick={() => {
          setclicado(!clicado);
          inputtext();
        }}
      >
        {props.children}
      </button>
    );
  }

  return (
    <div id="main">
      
      <div id="conteudo">
        {titulo()}

        <div className="paibt">
          
          <Mybutton>+</Mybutton>
    
          {mostrarinput && (
            <input
              className="input"
              type="text"
              onChange={mudartexto}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  addprojeto();
                  console.log(projetos);
                }
              }}
            />
          )}
        </div>

        <Mylista />
      </div>
    </div>
  );
}
function titulo(){
  let nome = JSON.parse(localStorage.getItem("nome")) 
  return <h1 className="nometitulo">ola {nome}</h1>
}

export default Home;
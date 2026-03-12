import { useEffect, useState } from "react";
function App() {
  let [mostrarinput, setmostrarinput] = useState(false);
  let [mostrarprojetos, setmostrarprojetos] = useState(false);
  let [texto, settexto] = useState("");
  let [projetos, setprojetos] = useState([]);
  let [tarefas, settarefas] = useState([]);
  let [projetoSelecionado, setProjetoSelecionado] = useState(null);
  let [clicado, setclicado] = useState("");
  useEffect(() => {
    chamarapi();
  }, []);

  async function chamarapi() {
    let resp = await fetch("/projetos");
    let dados = await resp.json();
    setprojetos(dados);
  }
  function mudartexto(e) {
    settexto(e.target.value);
  }
  async function tarefasprojeto(id) {
    let resp = await fetch(`/projetos/${id}/listartarefas`);
    let tarefas = await resp.json();
    settarefas(tarefas);
    setProjetoSelecionado(id);
    return tarefas.map((tarefa) => {
      return (
        <li key={tarefa.id}>
          {tarefa.nome} {tarefa.estado} {tarefa.criadoem}
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
  function Mylista() {
    return (
      <ul className="listas">
        {projetos.map((projeto) => (
          <li key={projeto.id}>
            <div onClick={() => tarefasprojeto(projeto.id)} className="projeto">
              <div className="divtitulo">
                <h3 className="tituloprojeto"> {projeto.nome}</h3>
                <h3 className="estadoprojeto">
                  {projeto.estado ? "ativo" : "inativo"}
                </h3>
              </div>
              <p>{}</p>
              {projetoSelecionado === projeto.id && (
                <ul id="listatarefas">
                  {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="litarefa">
                      <div className="divtitulo">
                        <p>
                          {tarefa.nome} - {String(tarefa.estado)}{" "}
                        </p>

                        <p className="data">
                          {new Date(tarefa.criadoem)
                            .toLocaleString("pt-BR", {
                              month: "2-digit",
                              year: "numeric",
                              day: "2-digit",
                            })
                            .replaceAll("/", "-")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: `${texto}`
    })
  });
    
    let dados = await resp.json();
    setprojetos([...projetos,dados]);
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
        {" "}
        {props.children}{" "}
      </button>
    );
  }
  return (
    <div id="main">
      <div id="conteudo">
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

        <Mylista></Mylista>
      </div>
    </div>
  );
}

export default App;

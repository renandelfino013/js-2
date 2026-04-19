const banco = require("../utils/db.js");

exports.criartarefa =  async (req,resp) => {

  
    let novatarefa = req.body
    let nome = req.body.nome
    //let projetoid = Number(req.params.projetoid)
   
   

        
    
  
    
    if(nome.length<3|| !nome){
        return resp.status(400).json({error:"o nome deve conter ao menos 3 caracteres"})
    }




 await banco.query("INSERT INTO tarefas (nometarefa, estado, id_projeto_ligado) VALUES ($1, $2, $3)", [nome, 'pendente', req.params.projetoid])
 
    return resp.status(201).json({msg: "tarefa criada com sucesso!"})

}

exports.listarporid = (req,resp) =>{
    const db= ler()
let id = Number(req.params.id)

let filtrado = tarefas.find(p => p.id === id)
if(filtrado){
    return resp.status(200).json(filtrado)
}
else{
return resp.status(404).json({error: "task not found"})
}
}
exports.listarporprojeto = async (req,resp) =>{
    
    let db = await banco.query("SELECT nometarefa,estado,criado_em,id FROM tarefas WHERE id_projeto_ligado = $1", [req.params.projetoid])
   //console.log(db.rows)
    return resp.status(200).json(db.rows)
}
////exports.atualizartarefa = (req,resp) => {
//// const db= ler()
////    const tarefas = db.tarefas
////    let id = Number(req.params.id)
////    
////    let updatetarefa = req.body
////    let filtrado = tarefas.find(p => p.id === id)
////
////    if(!updatetarefa.nome || updatetarefa.nome.length <3 ){
////        return resp.status(400).json({error: "nome invalido!!"})
////    }
////    else{////
////        if(!filtrado){
  //      return resp.status(404).json({error: "project not found!!"})
////        }
////    Object.assign(filtrado,req.body)
////    salvar(db)
////    return resp.status(200).json(filtrado)
////}
////}
exports.atualizarestado =(req,resp) =>{
     const db= ler()
    const tarefas = db.tarefas
    let id = Number(req.params.id)
    let nextestado = req.body.nextestado
    let filtrado = tarefas.find(p => p.id === id)
    if(!nextestado){
        return resp.status(400).json({error:"precisa conter o proximo estado"})
    }
    else if(!filtrado) {
        return resp.status(404).json({error:"task not found"})

    }
    else if (nextestado == "a fazer"||nextestado =="em andamento"|| nextestado == "concluida"){
        //Object.assign(filtrado,nextestado)
        filtrado.estado = nextestado
        salvar(db)
        return resp.status(200).json(filtrado)
    }
    else {
        return resp.status(400).json({error:"estado invalido!"})
    }


}
exports.deletartarefa  = async (req,resp) =>{
    let id = Number(req.params.id)
    await banco.query("DELETE FROM tarefas WHERE id = $1", [id])

  
    return resp.status(200).json({msg:"tarefa deletada com sucesso!"})
  


}

const { ler,salvar } = require("../utils/db");

exports.criartarefa = (req,resp) => {

  const db= ler()
    const tarefas = db.tarefas
    const projetos = db.projetos
    let novatarefa = req.body
    let novoid
    let nome = req.body.nome
    let projetoid = Number(req.params.projetoid)
    let validaridprojeto = projetos.find(p =>p.id === projetoid) ;
    let filtrado = tarefas.find(p => p.nome === nome)
    if(filtrado){
        return resp.status(400).json({error: "as tarefas n podem conter o mesmo nome "})
    }

    if(!nome|| nome.length <3 || !validaridprojeto || !projetoid  ){
        return resp.status(404).json({
            error: "produto n encontrado ou n validado"
        })

    }
   novoid = Number(Date.now())
    let data =new Date() 
    novatarefa.criadoem= data
    novatarefa.id = novoid
    novatarefa.estado = true
    novatarefa.projetoid = projetoid
    tarefas.push(novatarefa)
    
    salvar(db)
    return resp.status(201).json(novatarefa)



}
exports.listartarefas = (req,resp) =>{

   const db= ler()
    const tarefas = db.tarefas
return resp.status(200).json(tarefas)

}
exports.listarporid = (req,resp) =>{
    const db= ler()
    const tarefas = db.tarefas
let id = Number(req.params.id)

let filtrado = tarefas.find(p => p.id === id)
if(filtrado){
    return resp.status(200).json(filtrado)
}
else{
return resp.status(404).json({error: "task not found"})
}
}
exports.atualizartarefa = (req,resp) => {
 const db= ler()
    const tarefas = db.tarefas
    let id = Number(req.params.id)
    
    let updatetarefa = req.body
    let filtrado = tarefas.find(p => p.id === id)

    if(!updatetarefa.nome || updatetarefa.nome.length <=3 ){
        return resp.status(400).json({error: "nome invalido!!"})
    }
    else{
        if(!filtrado){
        return resp.status(404).json({error: "project not found!!"})
        }
    Object.assign(filtrado,req.body)
    salvar(db)
    return resp.status(200).json(filtrado)
}
}
exports.deletartarefa =(req,resp) =>{
  const db= ler()
    let tarefas = db.tarefas
    let id = Number(req.params.id)
    let antes = db.tarefas.length


   db.tarefas =  tarefas.filter(p => p.id !== id)
   let depois = db.tarefas.length
   if(antes === depois  ){
    return resp.status(404).json({msg :"projeto n encontrado"})
   }
salvar(db)
    return resp.status(200).json({msg: "projeto removido com succeso!"})


}
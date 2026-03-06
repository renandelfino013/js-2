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

    if(!nome || !projetoid  ){
        return resp.status(400).json({
            error: "produto n encontrado ou n validado"
        })

        
    }
    if(!validaridprojeto){
        return resp.status(404).json({ error: "projeto não encontrado" });
    }
    if(nome.length<3|| !nome){
        return resp.status(400).json({error:"o nome deve conter ao menos 3 caracteres"})
    }
    if (Number.isNaN(projetoid)) return resp.status(400).json({ error: "projetoid inválido" });
   novoid = Number(Date.now())
    let data =new Date().toISOString() 
    novatarefa.criadoem= data
    novatarefa.id = novoid
    novatarefa.estado = "a fazer"
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
exports.listarporprojeto =(req,resp) =>{
     const db= ler()
    const tarefas = db.tarefas
    const projetos = db.projetos
    const projetoid = Number(req.params.projetoid)
    if (Number.isNaN(projetoid)) return resp.status(400).json({ error: "projetoid inválido" });
    let ta = tarefas.filter(t => t.projetoid === projetoid)
   
    return resp.status(200).json(ta)
}
exports.atualizartarefa = (req,resp) => {
 const db= ler()
    const tarefas = db.tarefas
    let id = Number(req.params.id)
    
    let updatetarefa = req.body
    let filtrado = tarefas.find(p => p.id === id)

    if(!updatetarefa.nome || updatetarefa.nome.length <3 ){
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
exports.deletartarefa =(req,resp) =>{
  const db= ler()
    let tarefas = db.tarefas
    let id = Number(req.params.id)
    let antes = db.tarefas.length


   db.tarefas =  tarefas.filter(p => p.id !== id)
   let depois = db.tarefas.length
   if(antes === depois  ){
    return resp.status(404).json({msg :"tarefa n encontrada"})
   }
salvar(db)
    return resp.status(200).json({msg: "tarefa removida com succeso!"})


}
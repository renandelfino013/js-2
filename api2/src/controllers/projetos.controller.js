const { ler,salvar } = require("../utils/db");

    
exports.listarprojetos = (req,resp) => {
    const db= ler()
    const projetos = db.projetos
return resp.status(200).json(projetos)

}
exports.criarprojetos = (req,resp) =>{
    const db= ler()
    const projetos = db.projetos
    let novoprojeto = req.body
    let novoid
    let nome = req.body.nome
    if(!nome|| nome.length <3){
        return resp.status(400).json({
            error: "produto n encontrado ou n validado"
        })

    }
    if (projetos.length > 0){

      novoid =projetos[projetos.length -1].id +1;
        novoprojeto.id = novoid
    }
    else{
        novoid=1;
    }
    let data =new Date() 
    novoprojeto.criadoem= data
    novoprojeto.id = novoid
    novoprojeto.estado = true
    projetos.push(novoprojeto)
    
    salvar(db)
    return resp.status(201).json(novoprojeto)

}
exports.atualizarprojeto = (req,resp)=>{
    const db= ler()
    const projetos = db.projetos
    let id = Number(req.params.id)
    
    let updateprojeto = req.body
    let filtrado = projetos.find(p => p.id === id)

    if(!updateprojeto.nome || updateprojeto.nome.length <=3 ){
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
exports.listarporid = (req,resp) =>{
    const db= ler()
    const projetos = db.projetos
let id = Number(req.params.id)

let filtrado = projetos.find(p => p.id === id)
if(filtrado){
    return resp.status(200).json(filtrado)
}
else{
return resp.status(404).json({error: "project not found!!"})
}
}
exports.deletarprojetos = (req,resp) =>{
     const db= ler()
    let projetos = db.projetos
    let id = Number(req.params.id)
    let antes = db.projetos.length


   db.projetos =  projetos.filter(p => p.id !== id)
   let depois = db.projetos.length
   if(antes === depois  ){
    return resp.status(404).json({msg :"projeto n encontrado"})
   }
salvar(db)
    return resp.status(200).json({msg: "projeto removido com succeso!"})
    
}


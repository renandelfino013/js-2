const { ler,salvar } = require("../utils/db");
const db= ler()
    const projetos = db.projetos
exports.listarprojetos = (req,resp) => {
return resp.status(200).json(projetos.ler())

}
exports.criarprojetos = (req,resp) =>{
    
    let novoprojeto = req.body
    let novoid 
    if (projetos.length>0){
      novoid =projetos[projetos.length -1].id +1;
        
    }
    else{
        novoid=1;
    }
    novoprojeto.id = novoid
    projetos.push(novoprojeto)
    
    salvar(db)
    return resp.status(201).json(novoprojeto)

}
exports.atualizarprojeto = (req,resp)=>{

}
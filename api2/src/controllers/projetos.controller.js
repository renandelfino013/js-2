const banco = require("../utils/db.js");

    
exports.listarprojetos =  async (req,resp) => {
    const db=   await banco.query("SELECT * FROM projetos ORDER BY ID ASC")
    const projetos = db.rows
return resp.status(200).json(projetos)

}
exports.criarprojetos = (req,resp) =>{
    
    let nome = req.body.nome
    if(!nome|| nome.length <3){
        return resp.status(400).json({
            error: "produto n encontrado ou n validado"
        })

    }
    banco.query("INSERT INTO projetos (nome) VALUES ($1)", [nome])    
    
    return resp.status(201).json({msg: "projeto criado com sucesso!"})

}
exports.atualizarprojeto = (req,resp)=>{
   
    let id = Number(req.params.id)
    
    let updateprojeto = req.body

    if(!updateprojeto.nome || updateprojeto.nome.length <=3 ){
        return resp.status(400).json({error: "nome invalido!!"})
    }
    banco.query("UPDATE projetos SET nome = $1 WHERE id = $2", [updateprojeto.nome, id])
    return resp.status(200).json({msg: "projeto atualizado com sucesso!"})
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
exports.deletarprojetos = async  (req,resp) =>{
    
    
    let id = Number(req.params.id)
    
    let db = await banco.query("DELETE FROM projetos WHERE id = $1", [id])

  
    return resp.status(200).json({msg: "projeto removido com sucesso!"})
    


}
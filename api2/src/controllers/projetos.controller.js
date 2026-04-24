const banco = require("../utils/db.js");
const jwt = require("jsonwebtoken")

    
exports.listarprojetos =  async (req,resp) => {
   const codetoken = req.headers.authorization?.split(" ")[1];
   console.log(req.headers.authorization);
   let decoded = jwt.verify(codetoken, process.env.JWT_SECRET)
   let token = decoded.id
   
    const db = await banco.query("SELECT * FROM projetos WHERE usuario_id = $1", [token])
   
   
   
    
   
    const projetos = db.rows
return resp.status(200).json(projetos)

}
exports.criarprojetos = (req,resp) =>{
    
    const codetoken = req.headers.authorization?.split(" ")[1];
   console.log(req.headers.authorization);
   let decoded = jwt.verify(codetoken, process.env.JWT_SECRET)
   let token = decoded.id
    let nome = req.body.nome
    if(!nome|| nome.length <3){
        return resp.status(400).json({
            error: "produto n encontrado ou n validado"
        })

    }
    banco.query("INSERT INTO projetos (nome,usuario_id) VALUES ($1 , $2)", [nome, token])    
    
    return resp.status(201).json({msg: "projeto criado com sucesso!"})

}
exports.atualizarprojeto = (req,resp)=>{
   const codetoken = req.headers.authorization?.split(" ")[1];
   console.log(req.headers.authorization);
   let decoded = jwt.verify(codetoken, process.env.JWT_SECRET)
   let token = decoded.id
    let id = Number(req.params.id)
    
    let updateprojeto = req.body

    if(!updateprojeto.nome || updateprojeto.nome.length <=3 ){
        return resp.status(400).json({error: "nome invalido!!"})
    }
    banco.query("UPDATE projetos SET nome = $1 WHERE id = $2 AND usuario_id = $3", [updateprojeto.nome, id,token])
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
    const codetoken = req.headers.authorization?.split(" ")[1];
   console.log(req.headers.authorization);
   let decoded = jwt.verify(codetoken, process.env.JWT_SECRET)
   let token = decoded.id
   if (!token) {
    console.error("Token não encontrado. Faça login novamente.");
    return resp.status(401).json({ error: "Token não encontrado. Faça login novamente." });
  }
    
    let id = Number(req.params.id)
    
    let db = await banco.query("DELETE FROM projetos WHERE id = $1 AND usuario_id = $2", [id, token])

  
    return resp.status(200).json({msg: "projeto removido com sucesso!"})
    


}
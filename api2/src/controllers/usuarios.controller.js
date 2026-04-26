const banco = require("../utils/db.js");

const jwt = require("jsonwebtoken")
exports.register = async (req,resp) => {
    let email = req.body.email
    let senha = req.body.senha
    let username = req.body.username
    if(!email || !senha || !username){
        return resp.status(400).json({error: "email, senha e username são obrigatórios"})
    }

    await banco.query("INSERT INTO usuarios (email, senha, nome) VALUES ($1, $2, $3)", [email, senha, username])
     const db = await banco.query("SELECT id,nome FROM usuarios WHERE email = $1 AND senha = $2", [email, senha])
     const token = jwt.sign({id: db.rows[0].id, nome: db.rows[0].nome}, process.env.JWT_SECRET, {expiresIn: "1h"})
   return resp.status(200).json({token})
   
}
exports.login = async (req,resp) => {
    let email = req.body.email
    let senha = req.body.senha
    const db = await banco.query("SELECT id,nome FROM usuarios WHERE email = $1 AND senha = $2", [email, senha])
    console.log(db.rows)
    console.log("JWT_SECRET:", process.env.JWT_SECRET)
    
   try{
    if(db.rows.length > 0){
        
       const token = jwt.sign({id: db.rows[0].id, nome: db.rows[0].nome}, process.env.JWT_SECRET, {expiresIn: "1h"})
         return resp.status(200).json({token})
         
    }
    else{
        return resp.status(404).json({error: "usuario n encontrado ou senha incorreta"})
    }
    
   } catch (error) {
    return resp.status(500).json({error: "erro ao fazer login"})
   }}
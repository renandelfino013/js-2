const express=require("express")
const fs = require("fs")
const path = require("path")
const app = express()
app.use(express.json())
 const arquivo = path.join(__dirname, "data","produtos.json"
 ) 
 function ler( ){
    const txt = fs.readFileSync(arquivo,"utf-8")
    return JSON.parse(txt)
 }
 function salvar(dados){
    fs.writeFileSync(arquivo, JSON.stringify(dados,null,2))
 }
 app.get("/produtos", (req,resp)=> {
    return resp.send(ler())
 })
 app.post('/postprodutos' ,(req, resp) => {
    const produtos = ler();
    const novo = req.body;
    produtos.push(novo);
    salvar(produtos);
    return resp.status(201).json(novo)
 })
 app.listen(5000)
const { error } = require("console")
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
   
    if(!novo.price || !novo.title){
      
      return resp.status(400).json({error:"produto needs title and price"})
    }
     let novoid 

    if(produtos.length > 0){
      novoid =produtos[produtos.length -1].id +1;
    }
    else{
      novoid = 1
    }
    
    novo.id = novoid
    produtos.push(novo);
    salvar(produtos);
    return resp.status(201).json(novo)
 })
 app.listen(5000,() =>{
   console.log("porta 5000");
   
 } ) 
 app.get("/produtos/:id" , (req,resp) =>{
   const produtos = ler();
   const id =Number( req.params.id);
   const produto = produtos.find( p => p.id === id )
   if(!produto){
      return resp.status(404).json({error:"produto n encontrado"})
   }
   return resp.status(200).json(produto)
 })
 app.delete('/produtosdelete/:id', (req,resp) =>{
    const produtos = ler();
   const id =Number( req.params.id);
   const produto = produtos.some( p => p.id === id )
   let filtrado = produtos.filter(p =>p.id !== id);
   salvar(filtrado)
   return resp.status(200).json(produtos)
   
 })
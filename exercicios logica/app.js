const express = require("express")

const app = express()
app.use(express.json())

app.get("/" , (req,resp) =>{
 return resp.send(JSON.stringify({msg: "api na ativa pivete"}))


})
app.get("/sobre" ,(req,resp) => {
    return resp.send("gg")
})
app.get('/nome', (req, resp) => {
resp.send({
    nome: "renan",
    idade: 17
})

})
app.post("/usuario" , (req,resp) =>{
    let {nome} = req.body
return resp.json({
    msg: "usuario recebido",
    dados:nome,
  
})



})
app.listen(3000) 
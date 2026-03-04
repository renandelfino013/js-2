const express = require("express")

const projetosroutes = require("./src/routes/projetos.routes") 
const app = express()
app.use(express.json())
app.use("/projetos" , projetosroutes)


app.listen(3000 ,() =>{
console.log("rodando na porta 3000")
})
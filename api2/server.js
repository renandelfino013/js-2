const express = require("express")
const cors = require("cors")

const projetosroutes = require("./src/routes/projetos.routes")
const tarefasroutes = require("./src/routes/tarefas.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/projetos", projetosroutes)
app.use("/tarefas", tarefasroutes)

app.listen(3000, () => {
  console.log("rodando na porta 3000")
})



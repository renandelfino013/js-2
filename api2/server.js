require("dotenv").config({ path: "./.env" });
console.log(process.env.DB_PASSWORD)
const express = require("express")

const cors = require("cors")

const usuariosroutes = require("./src/routes/usuarios.routes.js")
const projetosroutes = require("./src/routes/projetos.routes")
const tarefasroutes = require("./src/routes/tarefas.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/projetos", projetosroutes)
app.use("/tarefas", tarefasroutes)
app.use("/usuarios", usuariosroutes)
app.listen(3000, () => {
  console.log("rodando na porta 3000")
})



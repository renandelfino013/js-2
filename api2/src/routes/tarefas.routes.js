const express =require("express") ;
const router = express.Router()
const { ler,salvar } = require("../utils/db");
const tarefascontroller = require("../controllers/tarefas.controller")


router.post("/:projetoid",tarefascontroller.criartarefa)
router.get("/", tarefascontroller.listartarefas)
router.get("/:id",tarefascontroller.listarporid)
router.patch("/:id", tarefascontroller.atualizartarefa)
router.delete("/:id" , tarefascontroller.deletartarefa)
module.exports = router

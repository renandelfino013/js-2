const express =require("express") ;
const router = express.Router()
const tarefascontroller = require("../controllers/tarefas.controller")


router.get("/", tarefascontroller.listartarefas)
router.get("/:id",tarefascontroller.listarporid)
router.patch("/:id", tarefascontroller.atualizartarefa)
router.delete("/:id" , tarefascontroller.deletartarefa)
router.patch("/:id/estado" , tarefascontroller.atualizarestado)
module.exports = router

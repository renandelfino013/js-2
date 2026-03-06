const express =require("express") ;
const router = express.Router()
const projetosController = require("../controllers/projetos.controller")



//rotas projetos
router.get("/", projetosController.listarprojetos)
router.get("/:id",projetosController.listarporid)
router.post("/", projetosController.criarprojetos);
router.patch("/:id", projetosController.atualizarprojeto);
router.delete("/:id", projetosController.deletarprojetos);
//---------------------------------------------------

router.post("/:projetoid/tarefas",tarefascontroller.criartarefa)
router.get("/:projetoid/listartarefas", tarefascontroller.listarporprojeto)


module.exports = router
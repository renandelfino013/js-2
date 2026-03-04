const express =require("express") ;
const router = express.Router()
const { ler,salvar } = require("../utils/db");
const projetosController = require("../controllers/projetos.controller")

router.get("/", projetosController.listarprojetos)
router.get("/:id",projetosController.listarporid)
router.post("/novo" , projetosController.criarprojetos)
router.patch("/patch/:id", projetosController.atualizarprojeto)
router.delete("/delete/:id",projetosController.deletarprojetos)



module.exports = router
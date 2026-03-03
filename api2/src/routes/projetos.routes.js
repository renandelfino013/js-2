const express =require("express") ;
const router = express.Router()
const { ler,salvar } = require("../utils/db");
const projetosController = require("../controllers/projetos.controller")

router.get("/", projetosController.listarprojetos)
router.post("/novo" , projetosController.criarprojetos)


module.exports = router
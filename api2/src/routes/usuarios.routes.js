const express =require("express") ;
const router = express.Router()
const usuarioscontroller = require("../controllers/usuarios.controller.js")

router.post("/", usuarioscontroller.register)
router.get("/login", usuarioscontroller.login)

module.exports = router
const express =require("express") ;
const router = express.Router()

router.get('/', (req , resp) => {
return resp.status(200).json({msg:"funcionando"})

})
module.exports = router
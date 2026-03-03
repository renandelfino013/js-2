const fs = require("fs")
const path = require("path")
const arquivo = path.join(__dirname , "data" , "db.json")
function ler(){
const txt  = fs.readFileSync(arquivo , "utf-8")
return JSON.parse(txt)

}
function salvar(dados){
    fs.writeFileSync(arquivo,JSON.stringify(dados, null ,2))
}
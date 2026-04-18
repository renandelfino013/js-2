const fs = require("fs")
const path = require("path")
const arquivo = path.join(__dirname ,"..", "data" , "db.json")

const {Client} = require("pg")
const con = new Client({
  user: "postgres",
  host: "localhost",
  database: "to_do",
  password: "321776renan",
  port: 5432,
})
con.connect().then(() => console.log("conectado ao banco de dados"))



module.exports = con

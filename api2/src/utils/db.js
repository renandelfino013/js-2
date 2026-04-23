require("dotenv").config({ path: "./.env" });

const fs = require("fs")
const path = require("path")
const arquivo = path.join(__dirname ,"..", "data" , "db.json")

const {Pool} = require("pg")

const con = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "to_do",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
})
con.connect().then(() => console.log("conectado ao banco de dados"))


module.exports = con

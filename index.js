// Invocando módulos e constantes
const path = require('path')
const express = require('express')
//const cors = require('cors')
const port = 3000
const app = express()
const basePath = path.join(__dirname, "templates");
const mysql = require('mysql');

//Chamadas de procedimento
app.use(express.static('public'))
//app.use(cors())
app.use(express.urlencoded({
    extended: true,
}),)
app.use(express.json())


//Conectando ao BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: '3306',
    database: "cadastro",
  });

//Iniciando o servidor http
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

//Criando rotas
app.get('/titulares/lista', (req, res) => {
    const sql = "SELECT matricula, nome, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as data_nascimento, cpf FROM titulares ORDER BY nome";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({titulares: result});
    });
});
app.get('/titulares', (req,res) => {
    res.sendFile(`${basePath}/titulares.html`)
})
app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})
app.post('/titulares/inserir', (req, res) => {
    const { matricula, nomeTitular, dataNascimento, cpf} = req.body
    console.log(req.body)
    sql = `INSERT INTO titulares VALUES ("${matricula}", "${nomeTitular}", "${dataNascimento}", "${cpf}")`
    db.query(sql, (err,result) => {
        if (err) {
            res.send(false)
        } else {
            res.send(true)
        }
    })
})

app.get('titulares/lista', (req, res) => {
    sql = "SELECT matricula, nome_titular, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as data_nascimento, cpf FROM titulares ORDER BY nome_titular"
    db.query(sql, (err,result) => {
        if (err){
            res.send(false)
        } else {
            res.send(JSON.stringify(result))
        }
    })
})


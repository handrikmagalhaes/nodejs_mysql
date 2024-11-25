// Invocando os módulos
const path = require('path')
const express = require('express')
const mysql = require('mysql')

//Chamadas de procedimentos
const app = express()
const basePath = path.join(__dirname, "templates")
app.use(express.urlencoded({
    extended: true,
}),
)
app.use(express.static('public'))

//Conectando ao MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema_cadastro"
})

//Iniciar servidor HTTP
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

//Rotas
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/titulares', (req, res) => {
    res.sendFile(`${basePath}/titulares.html`)
})

app.get('/titulares/lista', (req, res) => {
    const sql = "SELECT matricula, nome_titular, DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento, cpf FROM titulares ORDER BY nome_titular";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send=false;
        }
        res.json({titulares: result});
    })
})

app.post('/titulares/inserir', (req,res) => {
    const { matricula, nomeTitular, dataNascimento, cpf } = req.body
    var sql = `INSERT INTO titulares VALUES ("${matricula}", "${nomeTitular}", "${dataNascimento}", "${cpf}")`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(false)
        } else {
            res.send(true)
        }
    })

})

app.get('/titulares/consulta/:matricula', (req, res) => {
    const vMatricula = req.params.matricula;
    var sql = `SELECT matricula, nome_titular, DATE_FORMAT(data_nascimento, '%Y-%m-%d') AS data_nascimento, cpf FROM titulares WHERE matricula = ${vMatricula}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({titular: result})
        }
    })
})

app.put('/titulares/alterar/:matricula/', (req,res) => {
    const { nomeTitular, dataNascimento, cpf } = req.body
    const matricula = req.params.matricula
    var sql = `UPDATE titulares SET nome_titular="${nomeTitular}", data_nascimento="${dataNascimento}", cpf="${cpf}" WHERE matricula = "${matricula}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(false)
        } else {
            res.send(true)
        }
    })

})

app.delete('/titulares/excluir/:matricula/', (req,res) => {
    const matricula = req.params.matricula;
    var sql = `DELETE FROM titulares WHERE matricula = ${matricula}`;
    db.query(sql, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(true);
        }
    })
})
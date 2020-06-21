const express = require('express')
const server = express()

const db = require('./database/db') //Importando o objeto que possui a conexão com o banco de dados

//Configuração de pasta pública
server.use(express.static("public"))

// Habilitando o uso do req.body na aplicação, o objeto é responsável por receber informações via POST
server.use(express.urlencoded({extended: true}))

//Utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server, //Ligando nunjucks ao express
    noCache: true    //Não armazenar cache
})

//Configuração de rotas
server.get('/', (req, res) => {
    return res.render('index.html') 
})
server.get('/create-point', (req, res) => {
    return res.render('create-point.html') 
})

server.post('/savepoint', (req, res) => {

    const query = `
        INSERT INTO places(
            name, image, address, address2, state, city, items 
        )
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send('Erro no cadastro!')
        }
        return res.render('create-point.html', {saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == ''){
        return res.render('search-results.html', { total: 0 }) 
    }
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err , rows){
        if(err){
            return console.log(err)
        }
        else{
            return res.render('search-results.html', { places: rows, total: rows.length }) 
        }
    })
})

server.listen(3000)
const express = require('express')
const server = express()

//Configuração de pasta pública
server.use(express.static("public"))


//Utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server, //Ligando nunjucks ao express
    noCache: true    //Não armazenar cache
})

//Configuração de rotas
server.get('/', (req, res) => {
    return res.render('index.html', {
        title: "Seu marketplace de coleta de resíduos"
    }) 
})
server.get('/create-point', (req, res) => {
    return res.render('create-point.html') 
})
server.get('/search', (req, res) => {
    return res.render('search-results.html') 
})
server.listen(3000)
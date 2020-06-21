// Importando depedência do Sqlite3
const sqlite3 = require('sqlite3').verbose() // A função verbose tem como finalidade mostrar mensagens no terminal, sempre que comandos forem executados

// Criando o objeto de banco de dados, o arquivo será criado após a execução
const db = new sqlite3.Database('./src/database/database.db')

// Realizando operações 
db.serialize(() => {
    //Criando tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Deletando registros
    // db.run(`DELETE FROM places WHERE id = ?`, [], function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     else{
    //         console.log('Registro excluído com sucesso')
    //         console.log(this)
    //     }
    // })

})

module.exports = db // Exportando objeto para acesso em outros lugares da aplicação
const mongoose = require('mongoose')
// criando a conexão com a database
mongoose.connect('mongodb://localhost/jobs',{useNewUrlParser : true, useUnifiedTopology : true})
mongoose.set('useCreateIndex',true)
mongoose.Promise = global.Promise

// pegando a conexao com a database criar nossas coleções
const db = mongoose.connection

module.exports = db
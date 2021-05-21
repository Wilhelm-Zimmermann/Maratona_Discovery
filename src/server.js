const express = require('express')
const app = express()

// configurando a pasta public onde ficará as imagens, o .css, eo .js
app.use(express.static("public"))

// usando o urlencoded para formularios html
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

// configurando o ejs
app.set('view engine','ejs')
// setando as pastas dos arquivos ejs
app.set('views',__dirname+'/views')

// pegando as nossas rotas
const routes = require('./routes')

// tudo que vier depois do '/' serao nossas rotas
app.use('/',routes)

// configurando a porta que o browser escutará
app.listen(3000,() => {
    console.log('Server Running')
})

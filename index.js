const porta = 3000;
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const hbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const clienteController = require('./controllers/clienteController');
const ordemServicoController = require('./controllers/ordemServicoController');
const minhasrotas = require('./routes/minhasrotas')
//template engine
app.set('view engine','handlebars');
app.engine('handlebars',hbs.engine({defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
}));

//configurando a leitura de arquivos css
app.use(express.static(path.join(__dirname + '/public')));

//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//rotas
app.use('/',minhasrotas)
app.use('/',clienteController)
app.use('/',ordemServicoController)


app.listen(porta,()=>{
    console.log('Rodando...');
});
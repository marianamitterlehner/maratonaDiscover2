const express = require('express'); //função sendo executada 
//import express from "express"; 
const app = express();
const routes = require("./routes")
const path = require('path')


//usando tamplate engine
app.set('view engine', 'ejs'); //trabalha em cima da junção do html e js

app.set('views', path.join(__dirname, 'views')); // mudar a localizacao da pasta views

                                    // use serve para add propriedades ao servidor
app.use(express.static("public")); //habilitar arquivos statics //cria rotas staticas


//usar request.body
app.use(express.urlencoded({extended: true}));


app.use(routes); // usa as rotas do arquivo routes

app.listen(3333, () => console.log('Rodando'));
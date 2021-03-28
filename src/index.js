const express = require('express'); //função sendo executada 
//import express from "express"; 
const app = express();
const routes = require("./routes")


                                    // use serve para add propriedades ao servidor
app.use(express.static("public")); //habilitar arquivos statics //cria rotas staticas

app.use(routes); // usa as rotas do arquivo routes

app.listen(3333, () => console.log('Rodando'));
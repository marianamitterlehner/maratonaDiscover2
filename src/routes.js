const express = require('express');
const routes = express.Router();

const basePath = __dirname + "/pages";

//request é um pedido do front para o servidor
/*routes.get('/', (request, response) => { //get está pegando uma respota do servidor
    return response.send("oie"); // return está finalizando essa resposta
})*/


routes.get('/', (request, response) => response.sendFile(basePath + "/index.html"))
routes.get('/jobs', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/jobs/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))



module.exports = routes;
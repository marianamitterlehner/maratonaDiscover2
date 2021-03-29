const express = require('express'); //biblioteca para servidor
const routes = express.Router();

const basePath = __dirname + "/views/"; //rota base

//request é um pedido do front para o servidor
/*routes.get('/', (request, response) => { //get está pegando uma respota do servidor
    return response.send("oie"); // return está finalizando essa resposta
})*/
// Render -  renderizar o html para suportar js

const profile = {
    name: "Mari",
    avatar: "https://avatars.githubusercontent.com/u/51057747?v=4",
    "monthly-budget": 358521,
    "hours-per-day": 54,
    "days-per-week":2,
    "vacation-per-year":8
}


routes.get('/', (request, response) => response.render(basePath + "index"))
routes.get('/job', (request, response) => response.render(basePath + "job"))
routes.get('/job/edit', (request, response) => response.render(basePath + "job-edit"))
routes.get('/profile', (request, response) => response.render(basePath + "profile", {profile}))



module.exports = routes;
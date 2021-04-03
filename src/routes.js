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

const jobs = [
    {
        id: 1, 
        name: "Pizza Guloso",
        "daily-hours": 2,
        "total-hours": 30,
        created_at: Date.now() 
    },
    {
        id: 2, 
        name: "OneTwo Project",
        "daily-hours": 8,
        "total-hours": 68,
        created_at: Date.now() 
    }
]

const lastId = jobs[jobs.length - 1].id || 1; // gera um id 

routes.get('/', (request, response) => response.render(basePath + "index", {jobs: jobs} ))
routes.get('/job', (request, response) => response.render(basePath + "job"))
routes.post('/job', (request, response) => {

    jobs.push({ //especificando o que está vindo do meu body pela requisicao
        id: lastId + 1, //pegar o id gerado na var id e soma mais 1 de incremento
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
        created_at: Date.now() //atribuindo data de hoje
    })
    return response.redirect('/');
})
routes.get('/job/edit', (request, response) => response.render(basePath + "job-edit"))
routes.get('/profile', (request, response) => response.render(basePath + "profile", {profile: profile}))



module.exports = routes;
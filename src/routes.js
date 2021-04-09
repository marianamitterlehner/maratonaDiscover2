const express = require('express'); //biblioteca para servidor
const routes = express.Router();

/** modules exports */

const JobController = require('./controllers/JobController');
const ProfileController = require('./controllers/ProfileController');

//const basePath = __dirname + "/views/"; //rota base // nao e  mais usado 

//request é um pedido do front para o servidor
/*routes.get('/', (request, response) => { //get está pegando uma respota do servidor
    return response.send("oie"); // return está finalizando essa resposta
})*/
// Render -  renderizar o html para suportar js


/**  ROTAS   */

routes.get('/', JobController.index)

routes.get('/job', JobController.save)
routes.post('/job', JobController.create)

routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)



module.exports = routes;
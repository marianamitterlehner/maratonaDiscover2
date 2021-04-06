const express = require('express'); //biblioteca para servidor
const routes = express.Router();

const basePath = __dirname + "/views/"; //rota base

//request é um pedido do front para o servidor
/*routes.get('/', (request, response) => { //get está pegando uma respota do servidor
    return response.send("oie"); // return está finalizando essa resposta
})*/
// Render -  renderizar o html para suportar js


/** variaveis e function */

const Profile = {
    data:{
        name: "Mari",
        avatar: "https://avatars.githubusercontent.com/u/51057747?v=4",
        "monthly-budget": 358521,
        "hours-per-day": 54,
        "days-per-week":2,
        "vacation-per-year":8,
        "value-hours": 7.9
    },
    controller:{
        index(request, response) {
            return response.render(basePath + "profile", {profile: Profile.data})
        },

        update(request, response) {
            // pegar os dados
            const data = request.body

            //definnir quantas semanas num ano
            const weeksPerYear = 52

            //remove as semanas de ferias por ano e saber quantas faco distribuida por mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            //total de horas que trabalho por semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            //horas trabalhadas por mes 
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            //qual sera o valor da minha hora?
            const valueHour =  data["value-hours"] = data["monthly-budget"] / monthlyTotalHours

             Profile.data = {
                 ...Profile.data,
                 ... request.body,
                 "value-hours": valueHour
                /** esse valueHour vai ser direcionado para o perfil atraves do value-hours */
             }

             return response.redirect('/profile')
        }
    }
}


const Job = {
    data: [
        {
            id: 1, 
            name: "Pizza Guloso",
            "daily-hours": 2,
            "total-hours": 2,
            created_at: Date.now(),
        },
        {
            id: 2, 
            name: "OneTwo Project",
            "daily-hours": 7,
            "total-hours": 64,
            created_at: Date.now(),
        }
    ],

    controller: {
        index(request, response) {

            const updatesJob = Job.data.map((jobs) =>{
                
                const remaining = Job.services.remainingDays(jobs);
                // condicional de status
                const status = remaining <= 0 ? 'done' : 'progress'
                
                return {
                    ...jobs,
                    remaining: remaining,
                    status: status,
                    budget: Job.services.calculateBudget(jobs),
                } 
                
            })

            //no meu return continuo chamando o profile e o job 
            return response.render(basePath + "index", {jobs : updatesJob, profile: Profile.data}) 
        },

        create(request, response) {

            const lastId = Job.data[Job.data.length - 1].id || 0; // gera um id 

                Job.data.push({ //especificando o que está vindo do meu body pela requisicao
                    id: lastId + 1, //pegar o id gerado na var id e soma mais 1 de incremento
                    name: request.body.name,
                    "daily-hours": request.body["daily-hours"],
                    "total-hours": request.body["total-hours"],
                    created_at: Date.now() //atribuindo data de hoje
                })
                return response.redirect('/');
            
        },

        save(request, response){
            return response.render(basePath + "job")
        },

        show(request, response){
                /**
                 * mostrar a pagina do job
                 */
            //id passado como parametro na url
            const jobId = request.params.id;

            // verifica entre o id dentro Job.data se o que foi passado na requisicao e igual
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return response.send("Not found")
            }
             
            job.budget = Job.services.calculateBudget(job)

            return response.render(basePath + "job-edit",  { jobs:job})
        },

        update(request, response){
            /** Alteracao do job */
            //id passado como parametro na url
            const jobId = request.params.id;

            // verifica entre o id dentro Job.data se o que foi passado na requisicao e igual
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return response.send("Not found")
            }

            /**Alteracao */
             
            const updatedJob = {
                /**ideal seria um if para ver se o dado veio vazio */
                ...job, //o que eu ja tinha caso alguem esqueca de alterar um dado
                name: request.body.name, // recebo o nome que vem do body
                "total-hours": request.body["total-hours"], //reescrevendo as variaveis que ja estao no job
                "daily-hours": request.body["daily-hours"],
            }

            /** job.data recebe a alteracao se o jobId for igual ao id do array que ele ta pecorrendo */
             Job.data = Job.data.map(job=>{
                 if(Number(job.id) === Number(jobId)){
                     job = updatedJob
                 }
             })

             /**redireciona para mesma pagina do id vindo da requisicao */
             return response.redirect('/job/' + jobId)
        },

        delete(request, response){
            const jobId = request.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            /**  Job.data = Job.data.filter((job) => {
                if(Number(job.id) !== Number(jobId)){
                    Job.data.delete(job)
                }
            })*/

            return response.redirect('/')
        }
    },

    services: {
        remainingDays(jobs) {
            // calculo de tempo restante
            //tempo estimado do job
            const remainingDays = (jobs["total-hours"]/jobs["daily-hours"]).toFixed() //tofixed jeito de arredondar valor 

            //gerando uma data baseada na data de criacao do job
            const createdDate = new Date(jobs.created_at);
            
            //somar a data de criacao do job os dias estimados para a conclusao do job
            const dueDay = createdDate.getDate() + Number(remainingDays);

            //saber qual e a data futura baseada no dueDay em ms
            const dueDateInMs = createdDate.setDate(dueDay);       
            
            // data futura estipulada no dueDate menos a data do agora
            const timeDiffInMs = dueDateInMs - Date.now(); 
            // transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs/dayInMs);

            //restam tantos dias
            return dayDiff;
        },
        calculateBudget: (job) => Profile.data["value-hours"] * job["total-hours"]
    }
}


/**  ROTAS   */

routes.get('/', Job.controller.index)

routes.get('/job', Job.controller.save)
routes.post('/job', Job.controller.create)

routes.get('/job/:id', Job.controller.show)
routes.post('/job/:id', Job.controller.update)
routes.post('/job/delete/:id', Job.controller.delete)

routes.get('/profile', Profile.controller.index)
routes.post('/profile', Profile.controller.update)



module.exports = routes;
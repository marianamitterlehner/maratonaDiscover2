
/**chamando o dados do model */
const Jobs = require('../models/job');
const JobUtil = require('../utils/jobUtil');
const Profile = require('../models/profile');

module.exports = {
    index(request, response) {

        /** const Jobs = Job.get(); */
        const updatesJob = Jobs.get().map((jobs) =>{
            
            const remaining = JobUtil.remainingDays(jobs);
            // condicional de status
            const status = remaining <= 0 ? 'done' : 'progress'
            
            return {
                ...jobs,
                remaining: remaining,
                status: status, 
                budget: JobUtil.calculateBudget(jobs),
            } 
            
        })

        //no meu return continuo chamando o profile e o job 
        return response.render("index", {jobs : updatesJob, profile: Profile.get()}) 
    },

    create(request, response) {
        const jobs = Jobs.get(); /**tudo que eu importo em letra maiuscula, o que eu crio minuscula */
        const lastId = jobs[jobs.length - 1].id || 0; // gera um id 

            jobs.push({ //especificando o que está vindo do meu body pela requisicao
                id: lastId + 1, //pegar o id gerado na var id e soma mais 1 de incremento
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                created_at: Date.now() //atribuindo data de hoje
            })
            return response.redirect('/');
        
    },

    save(request, response){
        return response.render("job")
       /**return response.render(basePath + "job") //versao anterior */  
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

        return response.render("job-edit",  { jobs:job})
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
}
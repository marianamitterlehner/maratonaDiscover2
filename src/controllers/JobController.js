
/**chamando o dados do model */
const Jobs = require('../models/job');
const JobUtil = require('../utils/jobUtil');

module.exports = {

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
        /**variavel para o metodo get */
        const jobs = Jobs.get();
            /**
             * mostrar a pagina do job
             */
        //id passado como parametro na url
        const jobId = request.params.id;

        // verifica entre o id dentro Job.data se o que foi passado na requisicao e igual
        const job = jobs.find(jobs => Number(jobs.id) === Number(jobId))

        if(!job){
            return response.send("Not found")
        }
        

        job.budget = JobUtil.calculateBudget(job)

        /** o job e a variavel do Show, jobs e a variavel que vai para o html que padronizei para jobs */
        return response.render("job-edit",  {jobs:job})
    },

    update(request, response){
        //id passado como parametro na url
        const jobId = request.params.id;
        const jobs = Jobs.get();

        /** Alteracao do job */

        // verifica entre o id dentro Job.data se o que foi passado na requisicao e igual
        const job = jobs.find(job => Number(job.id) === Number(jobId))

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
        const newJobs = jobs.map(job => {
             if(Number(job.id) === Number(jobId)){
                 job = updatedJob
             }

             return job;
         })
         /** solicita a modificacao para o model*/
         Jobs.update(newJobs);

         /**redireciona para mesma pagina do id vindo da requisicao */
        return response.redirect('/job/' + jobId)
    },

    delete(request, response){
        const jobId = request.params.id

        Jobs.delete(jobId);
        
        /**  Job.data = Job.data.filter((job) => {
            if(Number(job.id) !== Number(jobId)){
                Job.data.delete(job)
            }
        })*/

        return response.redirect('/')
    }
}
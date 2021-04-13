/**chamando o dados do model */
const Jobs = require('../models/job');
const JobUtil = require('../utils/jobUtil');
const Profile = require('../models/profile');

module.exports = {
    index(request, response) {

        /**chamando os dados do model */
        const jobs = Jobs.get();
        const profile = Profile.get();

        /**variaveis */
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let totalJobHours = 0

        /** update */

        const updatesJob = jobs.map((jobs) =>{
            
            const remaining = JobUtil.remainingDays(jobs);
            // condicional de status
            const status = remaining <= 0 ? 'done' : 'progress'
            
            /** calculo do progress, done, total */
            statusCount[status] =+ 1;
            /** o statusCount ta passando como paramentro a variavel status que ja validou (resultado da linha status) se 
             * o job esta em progress ou done. Depois ele busca dentro do statusjob o conteudo que veio 
             * nessa variavel e o que for igual recebe mais um na soma total, pois ele foi iniciado com 0
             */

            /** total de horas por dia de cada job em progresso */
            if(status == 'progress'){
                totalJobHours += Number(jobs['daily-hours']);
            }

            /**totalJobHours = status == 'progress' ? totalJobHours += Number(jobs['daily-hours']) : totalJobHours*/ 

            return {
                ...jobs,
                remaining: remaining,
                status: status, 
                budget: JobUtil.calculateBudget(jobs),
            } 
            
        })

        /** Quantas hora sobra no meu dia */

        /**let totalJobHours = jobs.map(hours => {
            const remaining = JobUtil.remainingDays(jobs);
            const status = remaining <= 0 ? 'done' : 'progress'
            if(status == 'progress'){
                hours =+ Number(jobs['daily-hours'])
            }
            return hours
            
        }) */

        /**Horas livres por dia */
        let freeHours = profile['hours-per-day'] - totalJobHours

        
        //no meu return continuo chamando o profile e o job 
        return response.render("index", {jobs : updatesJob, profile: profile, status: statusCount, timeFree: freeHours }) 
    }
}
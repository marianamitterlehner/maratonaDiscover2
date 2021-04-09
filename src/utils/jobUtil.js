module.exports = {
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
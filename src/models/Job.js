
const Database = require('../db/config');


module.exports = {
    
    async get() {

        const db = await Database();

        const datas = await db.all(`SELECT * FROM jobs`); /**all tras tudo dentro do select
        enquanto o get so tras um */

        await db.close()
        
        return datas.map( data => {
            return { /**retornando um objeto */
                id: data.id,
                name: data.name,
                "daily-hours": data.daily_hours,
                "total-hours": data.total_hours,
                created_at: data.created_at
            };
        }) 

    },

    update(NewJobs) {
        data = NewJobs;
    },

    async delete(id) {
        
        const db = await Database();

        await db.run(`DELETE FROM jobs WHERE id = ${id}`);

        await db.close()
        //data = data.filter(job => Number(job.id) !== Number(id))
    }, 

    async create(NewJobs) {
        const db = await Database();

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${NewJobs.name}",
                ${NewJobs["daily-hours"]},
                ${NewJobs["total-hours"]}, 
                ${NewJobs.created_at}
            ); 
    
        `);
        
        await db.close()
    }
}  
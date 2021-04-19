const Database = require('../db/config');

module.exports = {  /** exportando o data que e uma constante */
    
    async get(){

            const db = await Database();

            const data = await db.get(`SELECT * FROM profiles`);

            await db.close()

        return {
            name: data.name,
            avatar: data.avatar, 
            "monthly-budget": data.monthly_budget, 
            "days-per-week" : data.days_per_week, 
            "hours-per-day": data.hours_per_day, 
            "vacation-per-year": data.vacation_per_year,
            "value-hours": data.value_hours
        };
    },
    async update(Newdata){
        
        const db = await Database()

        db.run(`UPDATE profiles SET 
                name = "${Newdata.name}",
                avatar = "${Newdata.avatar}",
                monthly_budget = ${Newdata["monthly-budget"]},
                days_per_week = ${Newdata["days-per-week"]},
                hours_per_day = ${Newdata["hours-per-day"]},
                vacation_per_year = ${Newdata["vacation-per-year"]},
                value_hours = ${Newdata["value-hours"]}
        `);

        await db.close()
        /**data = Newdata  this.data é uma referencia a Data que possui os dados  
                            mas tomar cuidado com ambiguidade como foi o caso*/
    }
}


/**Fornece dados a aplicacao */
/**Responsabilidade de arquivo */
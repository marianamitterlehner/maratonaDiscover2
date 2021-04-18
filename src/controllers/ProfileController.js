
/**chamando os arquivos */

const Profile = require('../models/Profile');


module.exports = {
    async index(request, response) {

        const profile = await Profile.get();
        return response.render("profile", {profile: await profile }) 
        /** Puxa o metodo get que contem o return da const data */
    },

    async update(request, response) {
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
        
        const profile = await Profile.get();

        Profile.update({
              /** passar como paramentro os dados que eu quero que altere dentro do model */
             ...profile, /**spret espalhar dados ja existentes */
             ...request.body, /**sub escreve o que vem do profile */
             "value-hours": valueHour
            /** esse valueHour vai ser direcionado para o perfil atraves do value-hours */
         })

         return response.redirect('/profile')
    }
}

/**fornece toda as regras e calculos da aplicacao */
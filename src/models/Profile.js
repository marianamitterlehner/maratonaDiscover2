let data = {
        name: "Mari",
        avatar: "https://avatars.githubusercontent.com/u/51057747?v=4",
        "monthly-budget": 358521,
        "hours-per-day": 54,
        "days-per-week":2,
        "vacation-per-year":8,
        "value-hours": 7.9
    } 


module.exports = {  /** exportando o data que e uma constante */
    get(){
        return data;
    },
    update(Newdata){
        data = Newdata /** this.data é uma referencia a Data que possui os dados  
                            mas tomar cuidado com ambiguidade como foi o caso*/
    }
}


/**Fornece dados a aplicacao */
/**Responsabilidade de arquivo */
const Database = require('./config');

const initDb = {

    async init(){
        const db = await Database();


        await db.exec(`
            CREATE TABLE profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                avatar TEXT, 
                monthly_budget INT, 
                days_per_week INT, 
                hours_per_day INT, 
                vacation_per_year INT, 
                value_hours INT
            );
        `);
        
        await db.exec(`
            CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                daily_hours INT, 
                total_hours INT,
                created_at DATETIME
            );
        `);
        
        await db.run(`
            INSERT INTO profiles (
                name,
                avatar, 
                monthly_budget, 
                days_per_week, 
                hours_per_day, 
                vacation_per_year,
                value_hours 
            ) VALUES (
                "Mariana",
                "https://avatars.githubusercontent.com/u/51057747?v=4",
                358521,
                54,
                2,
                8,
                4
            ); 
        `);
        
        
        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                2, 
                1618365183780
            ); 
        
        `);
        
        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "OneTwo Project",
                7,
                64, 
                1618365183780
            ); 
            
        `);
        
        await db.close();
    }

}

initDb.init();

/** executando o arquivo */
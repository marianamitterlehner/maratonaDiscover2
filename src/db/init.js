const Database = require('config');

Database()

Database.exec(`
    CREATE TABLE profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        avatar TEXT, 
        monthly_budget INT, 
        days_per_week INT, 
        hours_per_day INT, 
        vocation_per_year INT, 
        value_hours INT
    );
`)

Database.exec(`
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        daily_hours INT, 
        total_hours INT,
        created_at DATETIME
    );
`)

Database.run(`
    INSERT INTO profiles (
        name,
        avatar, 
        monthly_budget, 
        days_per_week, 
        hours_per_day, 
        vocation_per_year
    ) VALUES (
        "Mariana",
        "https://avatars.githubusercontent.com/u/51057747?v=4",
        358521,
        54,
        2,
        8
    ); 
`);


Database.run(`
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

Database.run(`
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

Database.close();
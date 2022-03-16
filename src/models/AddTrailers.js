const AddTrailers = {}

AddTrailers.create = (table) =>{

    const Createtable = `CREATE TABLE ${table}(
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        model VARCHAR(255) NOT NULL,
        make VARCHAR(255) NOT NULL,
        year int NOT NULL,
        trailerno VARCHAR(255) NOT NULL unique,
        vinnumber VARCHAR(255) NOT NULL,
        licence_plate VARCHAR(255) NOT NULL,
        state text not null,
        type text,
        filepath text,
        notes text,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`;
    
    return Createtable;

}

AddTrailers.insert = (table) =>{
    const insert = `INSERT INTO ${table} 
    (model,make,year,trailerno,vinnumber,filepath,licence_plate, state, type, notes) VALUES(?,?,?,?,?,?,?,?,?,?)`;
 
    return insert;
}

AddTrailers.select = (table) =>{
    const select = `SELECT * FROM ${table}`
    return select
}

module.exports = AddTrailers
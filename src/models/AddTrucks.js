const AddTrucks = {};
AddTrucks.create  = (table) =>{
    const TruckTable = `CREATE TABLE ${table}(
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        model VARCHAR(255) NOT NULL,
        make VARCHAR(255) NOT NULL,
        year int NOT NULL,
        truckno VARCHAR(255) NOT NULL unique,
        vinnumber VARCHAR(255) NOT NULL,
        licence_plate VARCHAR(255) NOT NULL,
        filepath text,
        notes text,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

        return TruckTable;
}

AddTrucks.insert = (table) =>{
   const insert = `INSERT INTO ${table} 
   (model,make,year,truckno,vinnumber,filepath,licence_plate,notes) VALUES(?,?,?,?,?,?,?,?)`;

   return insert;
}

module.exports = AddTrucks
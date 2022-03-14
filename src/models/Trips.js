const Trips = {}

Trips.create = (table) =>{
    const Create = `CREATE TABLE ${table}(
        trip_no INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        shipper_info text not null,
        receiver_info text not null,
        po_no text NOT NULL,
        commodity text NOT NULL,
        pickup_stops int(10) NOT NULL,
        delivery_stops int(10) NOT NULL,
        broker text NOT NULL,
        miles text,
        trailer_no text,
        temperature text,
        weight text,
        hazmat text,
        status text,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;
    return Create
}

Trips.alter = (table) =>{
    const Alter = `ALTER TABLE ${table} AUTO_INCREMENT = 1111`;
    return Alter
}

Trips.insert = (table) =>{
    const Insert = `INSERT INTO ${table}
    (shipper_info, receiver_info, po_no, commodity, pickup_stops, delivery_stops, broker, miles, trailer_no, temperature, weight, hazmat, status)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    return Insert
}

Trips.update = (table, value) =>{
    const status = `UPDATE ${table} SET status = '${value}'`;
    return status;
}

module.exports = Trips
CREATE TABLE IF NOT EXISTS DRIVERS (
 id UUID PRIMARY KEY,
 driverid integer NOT NULL ,
 firstname VARCHAR(255) NOT NULL,
 lastname VARCHAR(255) NOT NULL,
 phone VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL unique,
 driver_id VARCHAR(255) NOT NULL unique,
 drivers_licence VARCHAR(255) NOT NULL,
 licence_state VARCHAR(255) NOT NULL,
 truckno VARCHAR(255),
 filepath TEXT,
 reg_date TIMESTAMP,
 createdAt TIMESTAMP,
 updatedAt TIMESTAMP
 );

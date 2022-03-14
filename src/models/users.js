

 const users = `CREATE TABLE users(id INT(10) UNSIGNED AUTO_INCREMENT primary key NOT NULL,
 firstname VARCHAR(255) NOT NULL,
 lastname VARCHAR(255) NOT NULL,
 username VARCHAR(255) NOT NULL unique,
 email VARCHAR(255) NOT NULL unique,
 password VARCHAR(255) NOT NULL,
 company VARCHAR(255) NOT NULL,
 address TEXT,
 verify int,
 filepath text,
 reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;


    module.exports = users


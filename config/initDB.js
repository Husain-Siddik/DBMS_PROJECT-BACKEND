import db from "./db.js";

const initDB = () => {
  db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
    if (err) return console.log(err);

    db.query(
      "SELECT * FROM migrations WHERE name = 'init_tables'",
      (err, result) => {
        if (err) return console.log(err);

        if (result.length > 0) {
          console.log(" DB already initialized");
          return;
        }

        // users table
        db.query(`
                  CREATE TABLE IF NOT EXISTS users (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role ENUM('admin','user') NOT NULL DEFAULT 'user',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                  )
                `);

        // pets table
        db.query(`
                  CREATE TABLE IF NOT EXISTS pets (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    type VARCHAR(50) NOT NULL,
                    location VARCHAR(100) NOT NULL,
                    image VARCHAR(400),
                    description VARCHAR(255) NOT NULL,
                    status ENUM('lost', 'found') NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    INDEX idx_type_status_location (type, status, location)
                  )
                `);


        //veterinarians table  

        db.query(
          `
         CREATE TABLE veterinarians (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         clinic_name VARCHAR(100),
         address VARCHAR(255) NOT NULL,
         phone VARCHAR(20) NOT NULL,
         email VARCHAR(100),
         status ENUM('active','inactive') DEFAULT 'active',
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )`

        );

        //rescue team table

        db.query(
          `
          CREATE TABLE rescue_teams (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          service_area VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          description VARCHAR(255),
          status ENUM('active','inactive') DEFAULT 'active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
          `
        );



        db.query(
          "INSERT INTO migrations (name) VALUES ('init_tables')"
        );

        console.log(" Tables created first time ....!");
      }
    );
  });
};

export default initDB;
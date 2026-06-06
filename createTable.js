require("dotenv").config();
const mysql = require("mysql2/promise");

async function createTable() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await db.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        followers INT DEFAULT 0,
        following INT DEFAULT 0,
        public_repos INT DEFAULT 0,
        total_stars INT DEFAULT 0,
        total_forks INT DEFAULT 0,
        account_age INT DEFAULT 0,
        most_used_language VARCHAR(255),
        top_repo VARCHAR(255),
        profile_score INT DEFAULT 0,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Table created successfully");

    await db.end();
  } catch (error) {
    console.log(error);
  }
}

createTable();
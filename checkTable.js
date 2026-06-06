require("dotenv").config();
const mysql = require("mysql2/promise");

async function checkTable() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await db.query("SHOW TABLES");

    console.log(rows);

    await db.end();
  } catch (error) {
    console.log(error);
  }
}

checkTable();
// bisa tergubung ke mysql2
const mysql = require('mysql2');

// untuk mengkoneksikan backend dengan mysql
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// untuk mengecek koneksi
db.connect((err) => {
  if (err) {
    console.log(`error connection${err}`);
  } else {
    console.log('connection succes');
  }
});

module.exports = db;

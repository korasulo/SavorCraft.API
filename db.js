const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "savorbistrodb",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

const db = require("../db/db");
const bcrypt = require('bcryptjs')

const User = {
  create(name, email, password) {
    const password_digest = bcrypt.hashSync(password, 10);

    const sql = `
      INSERT INTO users(name, email, password_digest)
      VALUES($1, $2, $3) RETURNING *
    `;

    return db.query(sql, [name, email, password_digest]).then((dbResponse) => {
      return dbResponse.rows[0];
    }).catch(function(error ){
      console.log("Error:" + String(error));
  })
  },

  findUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1`;

   return db.query(sql, [email]).then((dbResponse) => {
      return dbResponse.rows[0]
    })
  }
};

module.exports = User;

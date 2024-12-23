const pool = require("../config/db");

const User = {
  create: (user, callback) => {
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    pool.query(
      query,
      [user.username, user.email, user.password, user.role],
      callback
    );
  },

  update: (id, user, callback) => {
    const query =
      "UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?";
    pool.query(
      query,
      [user.username, user.email, user.password, user.role, id],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM  users WHERE id = ?";
    pool.query(query, [id], callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    pool.query(query, [email], callback);
  },

  findAll: (callback) => {
    const query = "SELECT * FROM users";
    pool.query(query, [], callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    pool.query(sql, [id], callback);
  },
  findByRole: (role, callback) => {
    const sql = "SELECT * FROM users WHERE role = ?";
    pool.query(sql, [role], callback);
  },
};

module.exports = User;

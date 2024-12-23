const pool = require("../config/db");

const ProductRequest = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO product_requests (userId, productId, status) VALUES (?, ?, ?)";
    pool.query(
      sql,
      [data.userId, data.productId, data.status || "pending"],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
      }
    );
  },
  findPending: (callback) => {
    const sql = 'SELECT * FROM product_requests WHERE status = "pending"';
    pool.query(sql, callback);
  },
  updateStatus: (id, status, callback) => {
    const sql = "UPDATE product_requests SET status = ? WHERE id = ?";
    pool.query(sql, [status, id], callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM product_requests";
    pool.query(sql, callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * from product_requests where id = ?";
    pool.query(sql, [id], callback);
  },
  findOne: (data, callback) => {
    const sql = "SELECT * from product_requests where userId = ? and productId = ? and status = ?";
    pool.query(sql, [data.userId, data.productId, data.status], callback);
  }
};

module.exports = ProductRequest;

const pool = require("../config/db");

const Product = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO products (name, description, price, category, stock_quantity, manufacturer, release_date, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    pool.query(
      sql,
      [
        data.name,
        data.description,
        data.price,
        data.category,
        data.stock_quantity,
        data.manufacturer,
        data.release_date,
        data.rating,
      ],
      callback
    );
  },
  update: (id, data, callback) => {
    const sql = "UPDATE products SET ? WHERE id = ?";
    pool.query(sql, [data, id], callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM products WHERE id = ?";
    pool.query(sql, [id], callback);
  },

  findById: (id, callback) => {
    const sql = "SELECT * FROM products where id = ?";
    pool.query(sql, [id], callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM products";
    pool.query(sql, callback);
  },
};

module.exports = Product;

const pool = require("../config/db");

const UserProductList  = {
  create: (data, callback) => {
    const sql = "INSERT INTO user_product_lists (userId, name) VALUES (?, ?)";
    pool.query(sql, [data.userId, data.name], callback);
  },
  findByUserId: (userId, callback) => {
    const sql = "SELECT * FROM user_product_lists WHERE userId = ?";
    pool.query(sql, [userId], callback);
  },
};

module.exports = UserProductList;

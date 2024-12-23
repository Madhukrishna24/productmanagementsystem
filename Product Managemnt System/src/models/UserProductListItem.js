const pool = require("../config/db");

const UserProductListItem = {
  create: (data, callback) => {
    const sql = "INSERT INTO user_product_list_items (listId, productId) VALUES (?, ?)";
    pool.query(sql, [data.listId, data.productId], callback);
  },
  deleteByProductId: (listId, productId, callback) => {
    const sql = "DELETE FROM user_product_list_items WHERE listId = ? AND productId = ?";
    pool.query(sql, [listId, productId], callback);
  },
  findByListId: (listId, callback) => {
    const sql = "SELECT * FROM user_product_list_items WHERE listId = ?";
    pool.query(sql, [listId], callback);
  },
};

module.exports = UserProductListItem;

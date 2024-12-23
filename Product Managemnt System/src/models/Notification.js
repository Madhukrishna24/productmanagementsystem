const pool = require("../config/db");

const Notification = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO notifications (adminId, message, requestId) VALUES (?, ?, ?)";
    pool.query(sql, [data.adminId, data.message, data.requestId], callback);
  },
  findByAdminId: (adminId, callback) => {
    const sql =
      "SELECT * FROM notifications WHERE adminId = ? AND status IS NULL ORDER BY created_at DESC";
    pool.query(sql, [adminId, "NULL"], callback);
  },
  updateStatus: (id, status, callback) => {
    const sql = "UPDATE notifications SET status = ? WHERE id = ?";
    pool.query(sql, [status, id], callback);
  },
};

module.exports = Notification;

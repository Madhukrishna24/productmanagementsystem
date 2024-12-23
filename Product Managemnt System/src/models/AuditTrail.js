const pool = require("../config/db");

const AuditTrail = {
  log: (data, callback) => {

    
    const sql = "INSERT INTO audit_trails (userId, action, description) VALUES (?, ?, ?)";
    pool.query(sql, [data.userId, data.action, data.description], callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM audit_trails";
    pool.query(sql, callback);
  },
};

module.exports = AuditTrail;

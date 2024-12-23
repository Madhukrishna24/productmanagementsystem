const pool = require("../config/db");
const Notification = require("../models/Notification");
const AuditTrail = require("../models/AuditTrail");

const getNotifications = (req, res) => {
  const adminId = req.query.adminId;

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required." });
  }

  Notification.findByAdminId(adminId, (err, notifications) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ notifications });
  });
};

const handleRequest = (req, res) => {
  const { notificationId, isAccepted } = req.body;
  const newStatus = isAccepted ? "Accepted" : "Denied";
  // console.log(notificationId, isAccepted);

  const sql = "SELECT * FROM notifications WHERE id = ?";
  pool.query(sql, [notificationId], (err, notifications) => {
    if (err) {
      console.error("Error fetching notification:", err);
      return res.status(500).json({ error: err.message });
    }
    // console.log(notifications);

    const notification = notifications[0];
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    const productRequestSql = "SELECT * FROM product_requests WHERE id = ?";
    pool.query(
      productRequestSql,
      [notification.requestId],
      (err, productRequests) => {
        if (err) {
          console.error("Error fetching product request:", err);
          return res.status(500).json({ error: err.message });
        }
        // console.log(productRequests);

        const productRequest = productRequests[0];
        if (!productRequest) {
          console.error(
            "Product request not found for requestId:",
            notification.requestId
          );
          return res
            .status(404)
            .json({ success: false, message: "Product request not found" });
        }

        const updateRequestSql =
          "UPDATE product_requests SET status = ? WHERE id = ?";
        pool.query(updateRequestSql, [newStatus, productRequest.id], (err) => {
          if (err) {
            console.error("Error updating product request status:", err);
            return res.status(500).json({ error: err.message });
          }

          const updateNotificationSql =
            "UPDATE notifications SET status = ? WHERE id = ?";
          pool.query(
            updateNotificationSql,
            [newStatus, notificationId],
            (err) => {
              if (err) {
                console.error("Error updating notification status:", err);
                return res.status(500).json({ error: err.message });
              }
              AuditTrail.log(
                {
                  userId: notification.adminId,
                  action: newStatus,
                  description:
                    newStatus == "Accepted"
                      ? "Product request accepted"
                      : "Product request Denied",
                },
                (auditErr) => {
                  if (auditErr)
                    console.error("Failed to log audit trail:", auditErr);
                }
              );
              res.json({ success: true });
            }
          );
        });
      }
    );
  });
};

module.exports = {
  getNotifications,
  handleRequest,
};

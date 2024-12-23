const ProductRequest = require("../models/ProductRequest");
const Notification = require("../models/Notification");
const User = require("../models/User");
const AuditTrail = require("../models/AuditTrail");

const requestProduct = (req, res) => {
  const { userId, productId } = req.body;

  ProductRequest.create({ userId, productId }, (err, requestId) => {
    if (err) return res.status(500).json({ error: err.message });

    const message = `User ${userId} has requested Product ID ${productId}.`;
    AuditTrail.log(
      { userId, action: "REQUEST", description: message },
      (auditErr) => {
        if (auditErr) console.error("Failed to log audit trail:", auditErr);
      }
    );

    User.findByRole("admin", (err, admins) => {
      if (err) return res.status(500).json({ error: err.message });

      if (admins && admins.length > 0) {
        admins.forEach((admin) => {
          Notification.create(
            { adminId: admin.id, message, requestId },
            (notifErr) => {
              if (notifErr) {
                console.error("Error creating notification:", notifErr);
              }
            }
          );
        });
        res
          .status(201)
          .json({ message: "Product request submitted and admins notified." });
      } else {
        res.status(500).json({ message: "No admin found to notify." });
      }
    });
  });
};

const updateRequestStatus = (notificationId, isAccepted) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE requests SET status = ? WHERE id = ?`;
    const status = isAccepted ? "Accepted" : "Denied";

    db.run(query, [status, notificationId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  requestProduct,
  updateRequestStatus,
};

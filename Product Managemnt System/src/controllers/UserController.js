const UserProductList = require("../models/UserProductList");
const UserProductListItem = require("../models/UserProductListItem");
const ProductRequest = require("../models/ProductRequest");

const getPersonalProductList = (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  UserProductList.findByUserId(userId, (err, userList) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: "User's product list not found." });
    }

    const listId = userList[0].id;

    UserProductListItem.findByListId(listId, (err, products) => {
      if (err) return res.status(500).json({ error: "Error fetching products." });

      res.json({ products });
    });
  });
};

const addToProductList = (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "User ID and Product ID are required." });
  }

  // Check if the product request has been accepted before proceeding
  ProductRequest.findOne({ userId, productId, status: "Accepted" }, (err, productRequest) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!productRequest || productRequest.length == 0) {
      return res.status(400).json({ message: "Product request has not been accepted." });
    }

    // Proceed with adding the product to the user's list
    UserProductList.findByUserId(userId, (err, userList) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!userList || userList.length === 0) {
        // Create a new list if the user doesn't have one
        UserProductList.create({ userId, name: "My Product List" }, (createErr, newUserList) => {
          if (createErr) return res.status(500).json({ error: createErr.message });

          UserProductListItem.create(
            { listId: newUserList.insertId, productId: productId },
            (itemErr) => {
              if (itemErr) return res.status(500).json({ error: itemErr.message });

              res.status(201).json({ message: "Product added to new personal list." });
            }
          );
        });
      } else {
        const listId = userList[0].id;

        UserProductListItem.create(
          { listId: listId, productId: productId },
          (itemErr) => {
            if (itemErr) return res.status(500).json({ error: itemErr.message });

            res.status(201).json({ message: "Product added to personal list." });
          }
        );
      }
    });
  });
};

const removeFromProductList = (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "User ID and Product ID are required." });
  }

  UserProductList.findByUserId(userId, (err, userList) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: "User's product list not found." });
    }

    const listId = userList[0].id;

    UserProductListItem.deleteByProductId(listId, productId, (itemErr) => {
      if (itemErr) return res.status(500).json({ error: itemErr.message });

      res.status(200).json({ message: "Product removed from personal list." });
    });
  });
};

module.exports = {
  getPersonalProductList,
  addToProductList,
  removeFromProductList,
};

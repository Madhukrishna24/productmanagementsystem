require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const productRequestsRoute = require("./routes/productRequests");
const notificationsRoute = require("./routes/notifications");

const pool = require("./config/db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", productRequestsRoute);
app.use("/api", notificationsRoute);

app.get("/login", (req, res) => { 
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

app.get("/admin/dashboard", (req, res) => {
  res.render("dashboards/adminDashboard");
});

app.get("/user/dashboard", (req, res) => {
  res.render("dashboards/userDashboard");
});

app.get("/products-overview", (req, res) => {
  res.render("admin/product-overview");
});

app.get("/audit-trail", (req, res) => {
  res.render("admin/audit-trail");
});

app.get("/manage-users", (req, res) => {
  res.render("admin/manage-users");
});

app.get("/create-product", (req, res) => {
  res.render("admin/create-product");
});

app.get("/my-product-list", (req, res) => {
  res.render("user/userProductList");
});

app.get("/product-request", (req, res) => {
  res.render("user/product-request");
});

app.get("/admin/notifications", (req, res) => {
  res.render("admin/notifications");
});

app.get("/edit-product", (req, res) => {
  res.render("admin/edit-product");
});

app.get("/all-products", (req, res) => {
  res.render("user/all-products");
});

app.get("/", (req, res)=> {
  res.render("auth/login")
})

const PORT = process.env.PORT || 5000;

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    console.error("Failed to connect to the Database");
    process.exit(1);
  }
  console.log("Database connected");
  connection.release();
  app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
  });
});

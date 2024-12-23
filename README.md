# Node.js Product Management App

## Start the server by using below command. Before starting change the credentials in .env file
`node server.js`

## Introduction

This project is a Node.js-based product management application. It includes role-based authentication (Admin/User) and offers different dashboards and functionalities for administrators and regular users. The application is built using Express, MySQL, EJS, and features a RESTful API for handling backend operations.

## Features

### For Administrators:
- **User Management**: Create, update, and delete user accounts.
- **Product Management**: Manage products, including adding, updating, and deleting products.
- **Audit Trail**: Track actions taken by users, such as adding or updating products.
- **Notifications**: Receive and manage notifications related to product requests.

### For Users:
- **Personal Product List**: Create and manage a personal list of favorite products.
- **Product Requests**: Request products from the inventory, with the ability to track the status of requests.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Database for storing application data.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **EJS**: Embedded JavaScript templating for rendering views.
- **CSS**: For styling the frontend.
- **JavaScript**: For handling frontend logic.


## Install dependencies:
npm install


## Set up the database:
- Create a MySQL database.
- Update the config/db.js file with your MySQL credentials.

## Set up environment variables:
`
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=product_management_db
JWT_SECRET=your_jwt_secret_key
`
# API Endpoints
## Authentication:
- POST /api/auth/login: User login.
- POST /api/auth/register: User registration.

# Admin:
- GET /api/admin/dashboard: Admin dashboard.
- POST /api/admin/users: Create a new user.
- PUT /api/admin/users/
- : Update a user.
- DELETE /api/admin/users/
: Delete a user.

# Products:
- GET /api/products: Get all products.
- POST /api/products: Add a new product.
- PUT /api/products/:id
: Update a product.
- DELETE /api/products/:id
: Delete a product.

# Users
- GET /api/users/products/list Get personal productList
- DELETE /api/users/products/list/remove Remove the product from productList
- POST  /api/users/products/list/add Add new product to the productList

# Authentication
JWT-based authentication is used to secure the API. Users receive a token upon successful login, which must be included in the Authorization header for protected routes.

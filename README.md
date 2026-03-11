# 🛒 E-Commerce Platform (MEAN Stack)

## 📌 Overview

This project is a full-featured **E-Commerce platform** built using the **MEAN Stack**.
It allows users to browse products, add items to their cart, place orders, and manage their accounts.

The system supports **multiple roles** including customers, sellers, and administrators, providing a complete online shopping experience similar to modern e-commerce platforms.

---

# 🚀 Features

## 👤 User Management

* User registration & login
* Email confirmation
* Profile management (name, address, payment details)
* Multiple user roles:

  * Customer
  * Seller
  * Admin
* Wishlist & favorites
* Order history
* Reviews & ratings

---

## 📦 Product Management

* Product categories
* Product listings with:

  * Images
  * Descriptions
  * Prices
* Stock availability tracking
* Product search by name
* Product filtering by:

  * Category
  * Price range

---

## 🛒 Shopping Cart & Checkout

* Add/remove items from cart
* Quantity adjustment
* Order summary with price breakdown
* Guest checkout
* Multiple payment methods:

  * Credit Card
  * PayPal
  * Cash on Delivery
  * Wallet
* Promo codes and discounts

---

## 📑 Order Management

* Order placement & confirmation
* Order tracking with status updates
* Email notifications for order updates

---

## 💳 Payment Integration

Secure payment gateways including:

* Stripe
* PayPal
* Razorpay

Optional features:

* Card saving
* Autofill checkout

---

## 🛠 Admin Panel

* User management (approve / restrict users)
* Product & category management
* Order & shipping management
* Discount & promo code management
* Homepage banner/content management

---

## 🏪 Seller (Vendor) Management

* Seller registration
* Product listing & inventory management
* Order processing
* Earnings & payout tracking

---

# 🧰 Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Uploads)
* Nodemailer (Email Service)

### Frontend

* Angular

### Version Control

* Git
* GitHub (Feature Branch Workflow)

---

# 📂 Project Structure

```
project
│
├── src
│   ├── modules
│   │   ├── user
│   │   ├── product
│   │   ├── category
│   │   ├── order
│   │   ├── cart
│   │
│   ├── middleware
│   ├── utils
│   ├── config
│
├── uploads
├── app.js
└── server.js
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ecommerce-project.git
```

### 2️⃣ Navigate to project folder

```
cd ecommerce-project
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Configure environment variables

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### 5️⃣ Run the server

```
npm start
```

or

```
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

# 🔗 API Endpoints (Example)

### Product Routes

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /api/products     | Get all products   |
| GET    | /api/products/:id | Get single product |
| POST   | /api/products     | Create product     |
| PUT    | /api/products/:id | Update product     |
| DELETE | /api/products/:id | Delete product     |

---

# 📸 Demo

The application demonstrates:

* Product browsing
* Cart functionality
* Order placement
* Admin management features

A full walkthrough of the application and codebase will be presented during the project demonstration.

---

# 👩‍💻 Contributors

Project developed by the MEAN Stack team:
* Heba Maher
* Janna Wael
* Nagham Mohamed
* Shahd Mohammed 
* Somaya Ayman
 

---

# 📜 License

This project is for educational purposes.




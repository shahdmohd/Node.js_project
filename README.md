# 🛒 E-Commerce Platform (Node.js)

## Video Demo

https://drive.google.com/file/d/1RLALK46DtFBvcgz3_tWQC_yVW3AYCBWF/view?usp=sharing

## 📌 Overview

This is a full-featured **E-Commerce API** built with **Node.js, Express.js, and MongoDB**.
It provides complete backend functionality for an online shopping platform with support for multiple user roles (Customer, Seller, Admin), product management, order processing, and payment integration with Paymob.

---

## 🚀 Key Features

### 👤 User Management
- User registration & login with JWT authentication
- Email verification with confirmation links
- Password hashing and security
- Profile management (name, address, phone)
- Multiple user roles: Customer, Seller, Admin
- Account restriction/approval system
- Password change functionality

### 📦 Product Management
- Product CRUD operations
- Multiple product images
- Category management
- Price tracking
- Product approval system for sellers
- Seller product inventory

### 🛒 Cart & Orders
- Add/remove items from cart
- Quantity adjustment
- Order placement with auto-calculated totals
- Order history tracking
- Order cancellation
- Order status updates (pending, completed, cancelled)
- **Email notifications** for order placement, cancellation, and status updates

### 💳 Payment Integration
- **Paymob payment gateway integration**
- Item-level discount calculation
- Automatic discount itemization
- Payment status tracking
- Webhook support for payment notifications

### ⭐ Additional Features
- Favorites/Wishlist management
- Product reviews and ratings
- Coupon code system
- Category filtering
- Order management dashboard for admins

---

## 🧰 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Payment Gateway**: Paymob API
- **Validation**: Middleware-based validation

### Tools
- **Version Control**: Git
- **API Testing**: Postman Collection included
- **Environment Management**: dotenv

---

## 📂 Project Structure

```
├── Database/
│   ├── Models/
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Order.model.js
│   │   ├── Cart.model.js
│   │   ├── Payment.model.js
│   │   ├── Category.model.js
│   │   ├── Coupon.model.js
│   │   ├── Favorite.model.js
│   │   ├── Wishlist.model.js
│   │   ├── Reviews.model.js
│   │   └── OrderItem.model.js
│   └── dbconnect.js
├── Email/
│   ├── email.js (Transporter & email functions)
│   ├── emailTemplate.js
│   ├── orderTemplate.js
│   └── orderEmailTemplate.js
├── Middleware/
│   ├── verifyToken.js (JWT verification)
│   ├── validationMiddleware.js
│   ├── roleMiddleware.js (Role-based access)
│   ├── User/
│   │   ├── hashPassword.js
│   │   ├── CheckEmail.js
│   │   └── CatchError.js
│   └── Admin/
│       └── adminMiddleware.js
├── Modules/
│   ├── Users/
│   ├── Products/
│   ├── Orders/
│   ├── Cart/
│   ├── Payments/
│   ├── Categories/
│   ├── Coupons/
│   ├── Favorites/
│   ├── Wishlist/
│   ├── Reviews/
│   └── Admin/
├── Validation/
│   ├── userValidation.js
│   ├── favoriteValidation.js
│   ├── reviewsValidation.js
│   └── wishlistValidation.js
├── img/
│   └── discount.png (Discount icon for Paymob)
├── index.js (Main server file)
├── package.json
├── .env (Environment variables)
└── E-Commerce_API.postman_collection.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/Node.js_project.git
cd Node.js_project
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Paymob Configuration
PAYMOB_SECRET_KEY=your_paymob_secret_key
PAYMOB_PUBLIC_KEY=your_paymob_public_key
PAYMOB_INTEGRATION_ID=your_integration_id
PAYMOB_NOTIFICATION_URL=http://localhost:3000/api/payment/webhook
PAYMOB_REDIRECTION_URL=http://localhost:3000/payment/result

# Base URL
BASE_URL=http://localhost:3000
```

### 4️⃣ Start the server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:3000`

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/signin` | Login user |
| GET | `/verify/:token` | Verify email |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update profile |
| PUT | `/changePassword` | Change password |
| DELETE | `/profile` | Delete account |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Create product (Seller) |
| PUT | `/products/:id` | Update product (Seller) |
| DELETE | `/products/:id` | Delete product (Seller/Admin) |
| GET | `/myProducts` | Get seller's products |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Place new order |
| GET | `/orders` | Get user's orders |
| GET | `/orders/:orderID` | Get order details |
| POST | `/orders/:orderID/cancel` | Cancel order |
| POST | `/orders/:orderID/status` | Update status (Admin) |
| GET | `/allorders` | Get all orders (Admin) |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment/initiate` | Initiate Paymob payment |
| GET | `/payment` | Get user's payments |
| POST | `/payment/webhook` | Paymob webhook handler |

### Favorites & Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/favorite` | Add to favorites |
| GET | `/favorite` | Get favorites |
| POST | `/wishlist` | Add to wishlist |
| GET | `/wishlist` | Get wishlist |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| POST | `/categories` | Create category (Admin) |
| PUT | `/categories/:id` | Update category (Admin) |
| DELETE | `/categories/:id` | Delete category (Admin) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reviews` | Add product review |
| GET | `/reviews/:productId` | Get product reviews |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | List all users (Admin) |
| PUT | `/admin/users/:id/approve` | Approve user (Admin) |
| PUT | `/admin/users/:id/restrict` | Restrict user (Admin) |
| GET | `/admin/products` | List products (Admin) |
| PUT | `/admin/products/:id/approve` | Approve product (Admin) |

---

## 🔐 Authentication

All endpoints (except signup, signin, verify) require a JWT token in the request header:

```
Headers:
token: <your_jwt_token>
```

**Token structure:**
```javascript
{
  _id: "user_id",
  role: "customer|seller|admin",
  email: "user@example.com",
  iat: 1234567890
}
```

---

## 📧 Email Notifications

The system sends automated emails for:

1. **User Registration** - Email verification link
2. **Order Placement** - Order confirmation with details
3. **Order Cancellation** - Cancellation notification
4. **Order Status Updates** - Status change alerts (pending, completed, etc.)

Email templates are minimal and clean for better readability.

---

## 💳 Payment Integration (Paymob)

### How it works:
1. User places an order with items
2. Order total is calculated (or custom total is used)
3. Payment is initiated via Paymob API
4. System automatically adds discount items if there's a price difference
5. User redirected to Paymob checkout
6. Payment confirmation webhook is processed
7. Order status updated automatically

### Order Item Structure (Paymob):
```javascript
{
  name: "Product Name",
  description: "Product description",
  amount: 9999, // in cents
  quantity: 1
}
```

### Discount Handling:
If order total doesn't match item prices, a negative discount item is added:
```javascript
{
  name: "Discount",
  description: "Discount Applied",
  amount: -discountAmount, // negative for discount
  quantity: 1
}
```

---

## 📋 Using Postman Collection

1. **Import the collection**: `E-Commerce_API.postman_collection.json`
   - In Postman: File → Import → Select the JSON file

2. **Set Variables**:
   - After signing in, copy the token from response
   - Set `{{token}}` variable in Postman
   - Set other variables (productId, orderId, categoryId) as needed

3. **Test Endpoints**: Use the organized collection folders to test all endpoints

---

## 🗄️ Database Models

### User
```javascript
{
  name, email, password, phone, address,
  isConfirmed, role, isApproved, isRestricted
}
```

### Product
```javascript
{
  name, description, price, image[],
  category, seller, ratingsAverage, reviews[]
}
```

### Order
```javascript
{
  items[], user, payment, status,
  totalAmount, createdAt
}
```

### Payment
```javascript
{
  order, user, amount, currency,
  status, transactionId
}
```

---

## 🔄 Order Status Flow

```
pending → completed → (delivered/cancelled)
  ↓
cancelled (user can cancel anytime if pending)
```

---

## 🛡️ Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Email verification for registration
- ✅ Request validation middleware
- ✅ User account restriction system
- ✅ Admin approval for sellers

---

## 📝 Notes

- **Email Configuration**: Uses Gmail with App Password (not regular password)
- **Paymob**: Requires valid API credentials in `.env`
- **MongoDB**: Ensure MongoDB is running before starting the server
- **Token Header**: Use `token` as the header key (not `Authorization`)

---

## 👥 Team

Project developed by:
- Heba Maher
- Janna Wael
- Nagham Mohamed
- Shahd Mohammed
- Somaya Ayman

---

## 📜 License

This project is for educational purposes.





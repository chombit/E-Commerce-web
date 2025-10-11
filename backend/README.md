# E-Commerce Backend API

A comprehensive Node.js backend API for an e-commerce application built with Express.js, MongoDB, and JWT authentication.

## Features

- **User Authentication & Authorization**: Register, login, and JWT-based authentication
- **Product Management**: Full CRUD operations for products with categories and inventory
- **Shopping Cart**: Add, update, remove items with stock validation
- **Order Management**: Complete order lifecycle from cart to delivery
- **Role-based Access**: Admin and customer roles with appropriate permissions
- **Data Validation**: Comprehensive input validation and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for cross-origin requests

## Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   Update the `.env` file with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/e-commerce
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

3. **Seed Database (Optional)**
   Populate the database with sample data:
   ```bash
   npm run seed
   ```

## Usage

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (supports ?category=electronics)
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Shopping Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart` - Update cart item quantity (Protected)
- `DELETE /api/cart/item/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `POST /api/orders` - Create order from cart (Protected)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Sample Users

After running the seed script, you can use these test accounts:

**Admin User:**
- Email: admin@example.com
- Password: admin123
- Role: admin

**Customer Users:**
- Email: customer1@example.com / Password: customer123
- Email: customer2@example.com / Password: customer123
- Role: customer

## Data Models

### Product
```javascript
{
  title: String (required),
  price: Number (required),
  description: String (required),
  category: String (required),
  image: String (required),
  rating: {
    rate: Number (required),
    count: Number (required)
  },
  stock: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['customer', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (required),
    price: Number (required)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (required),
    price: Number (required)
  }],
  totalAmount: Number (required),
  subtotal: Number (required),
  tax: Number (required),
  shipping: Number (required),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: Object (required),
  paymentInfo: Object (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
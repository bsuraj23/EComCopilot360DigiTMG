# EComCopilot360DigiTMG

Full-stack e-commerce web application built with Node.js, Express, MongoDB, and React.

## Features

### Backend
- RESTful API with Node.js and Express
- MongoDB database integration
- JWT-based authentication
- User management (registration, login, profile)
- Product management (CRUD operations)
- Order management
- Payment processing simulation
- Admin authorization and authentication
- Input validation and error handling

### Frontend
- React-based single-page application
- Product browsing and search functionality
- Shopping cart management
- User authentication (login/register)
- Checkout process with address and payment method
- Order history for users
- Admin dashboard for inventory management
- Admin order management interface
- Responsive design for mobile and desktop

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. (Optional) Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured to connect to http://localhost:5000/api

4. Start the React development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Default Admin Credentials

After seeding the database, you can login with:
- Email: admin@example.com
- Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with search and filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)

## Project Structure

```
EComCopilot360DigiTMG/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       ├── productRoutes.js
│   │       └── orderRoutes.js
│   ├── server.js
│   ├── seeder.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   ├── Layout/
    │   │   └── Product/
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Products.js
    │   │   ├── ProductDetail.js
    │   │   ├── Cart.js
    │   │   ├── Checkout.js
    │   │   ├── Orders.js
    │   │   ├── AdminDashboard.js
    │   │   ├── AdminProducts.js
    │   │   └── AdminOrders.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env
```

## Features Walkthrough

### User Features
1. **Browse Products**: View all available products with search and category filters
2. **Product Details**: Click on any product to view detailed information
3. **Shopping Cart**: Add products to cart, update quantities, or remove items
4. **User Authentication**: Register and login to place orders
5. **Checkout**: Enter shipping address and select payment method
6. **Order History**: View all past orders and their status

### Admin Features
1. **Dashboard**: View statistics including total products, orders, revenue, and low stock items
2. **Product Management**: Add, edit, or delete products
3. **Order Management**: View all orders and update their status
4. **Inventory Tracking**: Monitor low stock items

## Development

To destroy seeded data:
```bash
cd backend
npm run seed:destroy
```

## License

ISC

## Author

EComCopilot360DigiTMG Team


# EComCopilot360DigiTMG - Full-Stack E-Commerce Application

A complete full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Backend Features
- **Node.js & Express** REST API
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **User Management**: Register, login, profile management
- **Product Management**: CRUD operations with search and filtering
- **Cart Management**: Add, update, remove items
- **Order Management**: Create orders, view order history, update order status
- **Payment Processing**: Simulated payment integration
- **Admin Features**: Product inventory management, order status updates
- **Role-based Authorization**: Admin and user roles

### Frontend Features
- **React** with functional components and hooks
- **React Router** for navigation
- **Responsive Design** with mobile-friendly CSS
- **Product Browsing**: Grid view with search and category filtering
- **Product Details**: Individual product pages
- **Shopping Cart**: Add to cart, update quantities, remove items
- **User Authentication**: Login and registration
- **Checkout Process**: Shipping address and payment method
- **Order History**: View past orders and their status
- **Admin Dashboard**: Manage products and orders

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── cartController.js     # Cart logic
│   │   ├── orderController.js    # Order logic
│   │   ├── productController.js  # Product logic
│   │   └── userController.js     # User logic
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── Cart.js               # Cart schema
│   │   ├── Order.js              # Order schema
│   │   ├── Product.js            # Product schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── cartRoutes.js         # Cart endpoints
│   │   ├── orderRoutes.js        # Order endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Loading.js        # Loading spinner
    │   │   ├── Navbar.js         # Navigation bar
    │   │   └── ProductCard.js    # Product card component
    │   ├── context/
    │   │   └── AuthContext.js    # Authentication context
    │   ├── pages/
    │   │   ├── Admin.js          # Admin dashboard
    │   │   ├── Cart.js           # Shopping cart
    │   │   ├── Checkout.js       # Checkout page
    │   │   ├── Home.js           # Home page
    │   │   ├── Login.js          # Login page
    │   │   ├── OrderDetail.js    # Order details
    │   │   ├── Orders.js         # Order history
    │   │   ├── ProductDetail.js  # Product detail page
    │   │   └── Register.js       # Registration page
    │   ├── services/
    │   │   └── api.js            # API service functions
    │   ├── App.js                # Main app component
    │   ├── index.css             # Global styles
    │   └── index.js              # Entry point
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
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

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will open in your browser at `http://localhost:3000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/all` - Get all users (admin only)

### Product Routes
- `GET /api/products` - Get all products (with optional search/filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart Routes
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Order Routes
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user's orders (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Usage

### Creating an Admin User

To create an admin user, you can either:

1. Register a normal user and manually update the role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. Or modify the User model to allow role specification during registration (for development only)

### Default Admin Access

After creating an admin user:
- Login with admin credentials
- Access the admin dashboard at `/admin`
- Manage products: Add, edit, delete
- Manage orders: View all orders, update order status

### Customer Flow

1. **Browse Products**: View products on the home page
2. **Search & Filter**: Use search bar and category filter
3. **View Details**: Click on a product to see details
4. **Add to Cart**: Select quantity and add to cart
5. **View Cart**: Review cart items, update quantities
6. **Checkout**: Enter shipping address and payment method
7. **Place Order**: Confirm and place order
8. **View Orders**: Check order history and status
9. **Payment**: Simulate payment for pending orders

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes and API endpoints
- Role-based authorization (user/admin)
- Input validation
- CORS configuration

## Future Enhancements

- Real payment gateway integration (Stripe, PayPal)
- Image upload functionality
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Email notifications
- Advanced search with multiple filters
- Pagination for products and orders
- Product variants (size, color)
- Inventory alerts for low stock
- Sales analytics dashboard

## License

MIT

## Author

Developed for EComCopilot360DigiTMG project

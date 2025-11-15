# Quick Start Guide

This guide will help you set up and run the E-Commerce application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - You have two options:
  - Local installation - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **npm** (comes with Node.js) or **yarn**

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bsuraj23/EComCopilot360DigiTMG.git
cd EComCopilot360DigiTMG
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

⚠️ **Important:** Change the `JWT_SECRET` to a random, secure string.

#### Start MongoDB (if using local installation)
```bash
# On macOS/Linux
mongod

# On Windows, MongoDB usually runs as a service
# Or run: "C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

#### Seed the Database (Optional but Recommended)
This will populate your database with sample products and users:

```bash
npm run seed
```

This creates:
- **Admin user**: email: `admin@ecommerce.com`, password: `admin123`
- **Test user**: email: `john@example.com`, password: `password123`
- **8 sample products** across different categories

#### Start the Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend API will be running at: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window/tab:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Frontend Development Server
```bash
npm start
```

The application will automatically open in your browser at: `http://localhost:3000`

## Testing the Application

### As a Customer:

1. **Register** a new account or use the test account:
   - Email: `john@example.com`
   - Password: `password123`

2. **Browse Products** on the home page
3. **Search** for products using the search bar
4. **Filter** by category
5. **View Product Details** by clicking on a product
6. **Add to Cart** from the product detail page
7. **View Cart** and update quantities
8. **Proceed to Checkout** and enter shipping information
9. **Place Order** and view order confirmation
10. **View Orders** in the "My Orders" page
11. **Update Profile** in the profile page

### As an Admin:

1. **Login** with admin credentials:
   - Email: `admin@ecommerce.com`
   - Password: `admin123`

2. **Access Admin Dashboard** by clicking "Admin" in the navigation
3. **Manage Products**:
   - Add new products
   - Delete existing products
   - View all products
4. **Manage Orders**:
   - View all orders
   - Update order status (Pending → Processing → Shipped → Delivered)

## API Endpoints Reference

### Base URL
`http://localhost:5000/api`

### User Endpoints
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile (protected)
- `PUT /users/profile` - Update user profile (protected)
- `GET /users/all` - Get all users (admin only)

### Product Endpoints
- `GET /products` - Get all products (supports query params: search, category, minPrice, maxPrice)
- `GET /products/:id` - Get single product
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Cart Endpoints
- `GET /cart` - Get user's cart (protected)
- `POST /cart` - Add item to cart (protected)
- `PUT /cart` - Update cart item (protected)
- `DELETE /cart/:productId` - Remove item from cart (protected)
- `DELETE /cart` - Clear cart (protected)

### Order Endpoints
- `POST /orders` - Create order (protected)
- `GET /orders/myorders` - Get user's orders (protected)
- `GET /orders/all` - Get all orders (admin only)
- `GET /orders/:id` - Get order by ID (protected)
- `PUT /orders/:id/pay` - Mark order as paid (protected)
- `PUT /orders/:id/status` - Update order status (admin only)

## Common Issues and Solutions

### Issue: MongoDB Connection Error
**Solution:** 
- Ensure MongoDB is running
- Check your `MONGODB_URI` in the `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Issue: Port 5000 is already in use
**Solution:** 
- Change the `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### Issue: Cannot connect to backend from frontend
**Solution:** 
- Ensure backend is running on port 5000
- Check the `proxy` setting in `frontend/package.json`

### Issue: JWT Authentication Error
**Solution:** 
- Ensure `JWT_SECRET` is set in the `.env` file
- Clear browser localStorage and login again

## Development Tips

### Running Both Servers Simultaneously
You can use two terminal windows, or use a tool like `concurrently`:

```bash
# Install globally
npm install -g concurrently

# From root directory, add to package.json:
"scripts": {
  "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
}

# Run both servers
npm run dev
```

### Hot Reload
- Backend: Use `npm run dev` (with nodemon)
- Frontend: Automatically enabled with `react-scripts`

### Clearing the Database
To start fresh, connect to MongoDB and drop the database:

```bash
mongo
use ecommerce
db.dropDatabase()
```

Then run `npm run seed` again to populate with sample data.

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use secure values for production
2. **Database**: Use MongoDB Atlas or a production MongoDB instance
3. **Build Frontend**: Run `npm run build` in the frontend directory
4. **Serve Static Files**: Configure Express to serve the built React app
5. **Security**: Add rate limiting, helmet.js, and other security middleware
6. **HTTPS**: Use SSL certificates (Let's Encrypt, Cloudflare)
7. **Environment**: Set `NODE_ENV=production`

## Support

For issues or questions, please refer to the main README.md or create an issue in the repository.

## Happy Coding! 🚀

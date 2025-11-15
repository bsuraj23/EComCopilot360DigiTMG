# Project Architecture

## Overview

This document provides a comprehensive overview of the e-commerce application architecture, component relationships, and data flow.

## Technology Stack

### Backend
- **Runtime**: Node.js v14+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, express-rate-limit
- **Environment**: dotenv

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Custom CSS (Responsive)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    React Frontend                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │   Pages    │  │ Components │  │  Context   │         │  │
│  │  │            │  │            │  │            │         │  │
│  │  │ • Home     │  │ • Navbar   │  │ • Auth     │         │  │
│  │  │ • Product  │  │ • Card     │  │            │         │  │
│  │  │ • Cart     │  │ • Loading  │  │            │         │  │
│  │  │ • Checkout │  │            │  │            │         │  │
│  │  │ • Orders   │  │            │  │            │         │  │
│  │  │ • Admin    │  │            │  │            │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │         │               │               │                │  │
│  │         └───────────────┴───────────────┘                │  │
│  │                         │                                │  │
│  │                  ┌──────▼───────┐                        │  │
│  │                  │ API Services │                        │  │
│  │                  │    (Axios)   │                        │  │
│  │                  └──────┬───────┘                        │  │
│  └─────────────────────────┼────────────────────────────────┘  │
└────────────────────────────┼───────────────────────────────────┘
                             │
                        HTTP/HTTPS
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                      SERVER LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Express.js Server                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ Middleware │  │   Routes   │  │Controllers │         │  │
│  │  │            │  │            │  │            │         │  │
│  │  │ • CORS     │  │ • /users   │  │ • User     │         │  │
│  │  │ • JWT Auth │  │ • /products│  │ • Product  │         │  │
│  │  │ • Rate     │  │ • /cart    │  │ • Cart     │         │  │
│  │  │   Limit    │  │ • /orders  │  │ • Order    │         │  │
│  │  │ • JSON     │  │            │  │            │         │  │
│  │  │   Parser   │  │            │  │            │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │         │               │               │                │  │
│  │         └───────────────┴───────────────┘                │  │
│  │                         │                                │  │
│  │                  ┌──────▼───────┐                        │  │
│  │                  │    Models    │                        │  │
│  │                  │  (Mongoose)  │                        │  │
│  │                  └──────┬───────┘                        │  │
│  └─────────────────────────┼────────────────────────────────┘  │
└────────────────────────────┼───────────────────────────────────┘
                             │
                         MongoDB
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                     DATABASE LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    MongoDB Database                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │   users    │  │  products  │  │   carts    │         │  │
│  │  │ Collection │  │ Collection │  │ Collection │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │  ┌────────────┐                                          │  │
│  │  │   orders   │                                          │  │
│  │  │ Collection │                                          │  │
│  │  └────────────┘                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Structure

### Backend Architecture

```
backend/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controllers/
│   ├── cartController.js        # Cart business logic
│   ├── orderController.js       # Order business logic
│   ├── productController.js     # Product business logic
│   └── userController.js        # User business logic
├── middleware/
│   ├── auth.js                  # JWT authentication & authorization
│   └── rateLimiter.js           # Rate limiting configuration
├── models/
│   ├── Cart.js                  # Cart schema definition
│   ├── Order.js                 # Order schema definition
│   ├── Product.js               # Product schema definition
│   └── User.js                  # User schema definition
├── routes/
│   ├── cartRoutes.js            # Cart API endpoints
│   ├── orderRoutes.js           # Order API endpoints
│   ├── productRoutes.js         # Product API endpoints
│   └── userRoutes.js            # User API endpoints
├── seed.js                       # Database seeding script
└── server.js                     # Application entry point
```

### Frontend Architecture

```
frontend/
├── public/
│   └── index.html               # HTML template
├── src/
│   ├── components/
│   │   ├── Loading.js           # Loading spinner component
│   │   ├── Navbar.js            # Navigation bar component
│   │   └── ProductCard.js       # Product card component
│   ├── context/
│   │   └── AuthContext.js       # Authentication state management
│   ├── pages/
│   │   ├── Admin.js             # Admin dashboard
│   │   ├── Cart.js              # Shopping cart page
│   │   ├── Checkout.js          # Checkout page
│   │   ├── Home.js              # Home/product listing page
│   │   ├── Login.js             # Login page
│   │   ├── OrderDetail.js       # Order detail page
│   │   ├── Orders.js            # Order history page
│   │   ├── ProductDetail.js     # Product detail page
│   │   ├── Profile.js           # User profile page
│   │   └── Register.js          # Registration page
│   ├── services/
│   │   └── api.js               # API service functions
│   ├── App.js                   # Main application component
│   ├── index.css                # Global styles
│   └── index.js                 # Application entry point
└── package.json                 # Frontend dependencies
```

## Data Flow

### 1. User Authentication Flow

```
User → Login Page → API Service → POST /api/users/login
                                        ↓
                              Auth Controller validates
                                        ↓
                              JWT Token generated
                                        ↓
                          Token stored in localStorage
                                        ↓
                    Token included in subsequent requests
                                        ↓
                         Protected routes accessible
```

### 2. Product Browsing Flow

```
User → Home Page → API Service → GET /api/products
                                        ↓
                             Product Controller
                                        ↓
                               MongoDB Query
                                        ↓
                           Products returned to UI
                                        ↓
                         Displayed in grid layout
```

### 3. Shopping Cart Flow

```
User → Product Detail → Add to Cart → POST /api/cart
                                            ↓
                               JWT Token validated
                                            ↓
                                Cart Controller
                                            ↓
                           Product stock checked
                                            ↓
                          Cart updated in database
                                            ↓
                         Updated cart returned
                                            ↓
                           Cart badge updated
```

### 4. Checkout Flow

```
User → Cart → Checkout Page → Enter shipping details
                                        ↓
                            POST /api/orders
                                        ↓
                         Order Controller validates
                                        ↓
                    Stock availability checked
                                        ↓
                        Order created in DB
                                        ↓
                      Product stock updated
                                        ↓
                          Cart cleared
                                        ↓
                    Redirect to order detail
```

### 5. Admin Product Management Flow

```
Admin → Admin Dashboard → Add Product → POST /api/products
                                              ↓
                                  Admin role verified
                                              ↓
                                Product Controller
                                              ↓
                              Product saved to DB
                                              ↓
                            Product list updated
```

## API Request/Response Flow

### Example: Create Order

```
1. Client Request:
   POST /api/orders
   Headers: { Authorization: "Bearer <token>" }
   Body: {
     orderItems: [...],
     shippingAddress: {...},
     paymentMethod: "Credit Card"
   }

2. Middleware Chain:
   - CORS middleware
   - JSON parser
   - Rate limiter (30 req/min)
   - JWT authentication
   - Transaction rate limiter

3. Controller Processing:
   - Validate order items
   - Check product stock
   - Calculate total price
   - Create order document
   - Update product stock
   - Clear user's cart

4. Database Operations:
   - Insert order
   - Update products
   - Update cart

5. Response:
   Status: 201 Created
   Body: { order details }
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                  │
├─────────────────────────────────────────┤
│  1. Rate Limiting                       │
│     • General: 100 req/15min            │
│     • Auth: 5 req/15min                 │
│     • Transactions: 30 req/min          │
├─────────────────────────────────────────┤
│  2. Authentication                      │
│     • JWT tokens                        │
│     • Token expiration                  │
│     • Secure token storage              │
├─────────────────────────────────────────┤
│  3. Authorization                       │
│     • Role-based access (user/admin)    │
│     • Resource ownership validation     │
│     • Protected routes                  │
├─────────────────────────────────────────┤
│  4. Data Protection                     │
│     • Password hashing (bcrypt)         │
│     • Input validation                  │
│     • Schema enforcement                │
├─────────────────────────────────────────┤
│  5. Network Security                    │
│     • CORS configuration                │
│     • Environment variables             │
│     • Error sanitization                │
└─────────────────────────────────────────┘
```

## State Management

### Frontend State

```
┌────────────────────────────────────┐
│      Authentication State          │
│  (AuthContext)                     │
│  • user                            │
│  • login()                         │
│  • register()                      │
│  • logout()                        │
└────────────────────────────────────┘
           │
           ├─→ Protected Routes
           ├─→ User Profile
           ├─→ Cart Access
           └─→ Admin Access

┌────────────────────────────────────┐
│      Component State               │
│  (useState/useEffect)              │
│  • products                        │
│  • cart                            │
│  • orders                          │
│  • loading                         │
│  • errors                          │
└────────────────────────────────────┘
```

### Backend State

```
┌────────────────────────────────────┐
│      Database State                │
│  (MongoDB Collections)             │
│  • Users                           │
│  • Products                        │
│  • Carts                           │
│  • Orders                          │
└────────────────────────────────────┘
           │
           └─→ Accessed via Mongoose Models
```

## Deployment Architecture

```
Development Environment:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Dev     │────→│  Express Dev    │────→│  MongoDB Local  │
│   Server        │     │  Server         │     │  or Atlas       │
│   (Port 3000)   │     │  (Port 5000)    │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘

Production Environment:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Static        │────→│  Express App    │────→│  MongoDB Atlas  │
│   React Build   │     │  (PM2/Docker)   │     │  (Cloud)        │
│   (Nginx)       │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## File Size Summary

```
Backend Files:
- Models: ~3.5 KB (4 files)
- Controllers: ~14.5 KB (4 files)
- Routes: ~2 KB (4 files)
- Middleware: ~2.5 KB (2 files)
- Config: ~0.5 KB (1 file)
- Total: ~23 KB

Frontend Files:
- Pages: ~32 KB (10 files)
- Components: ~2 KB (3 files)
- Context: ~1.8 KB (1 file)
- Services: ~3.3 KB (1 file)
- Styles: ~5.5 KB (1 file)
- Total: ~44.6 KB

Total Application Code: ~67.6 KB (excluding dependencies)
```

## Performance Considerations

1. **Database Indexing**: Add indexes on frequently queried fields
2. **Caching**: Implement Redis for session management
3. **Pagination**: Add pagination for large product lists
4. **Image Optimization**: Use CDN for product images
5. **Code Splitting**: Implement lazy loading for React routes
6. **Compression**: Enable gzip compression on Express

## Scalability Considerations

1. **Horizontal Scaling**: Use load balancers for multiple server instances
2. **Database Sharding**: Partition data for better performance
3. **Microservices**: Split into separate services (auth, products, orders)
4. **Message Queue**: Implement RabbitMQ/Redis for async operations
5. **CDN**: Use CloudFront/Cloudflare for static assets

## Monitoring & Logging

Recommended tools:
- **APM**: New Relic, DataDog
- **Logging**: Winston, Morgan
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Mixpanel

---

This architecture provides a solid foundation for a scalable e-commerce application with room for growth and enhancement.

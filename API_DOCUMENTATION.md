# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
**GET** `/auth/me`

Get currently logged in user details. Requires authentication.

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-11-15T09:00:00.000Z"
  }
}
```

---

## Product Endpoints

### Get All Products
**GET** `/products`

Get all products with optional search and filters.

**Query Parameters:**
- `search` (optional): Search in product name and description
- `category` (optional): Filter by category
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter

**Example:**
```
GET /products?search=laptop&category=Electronics&minPrice=500&maxPrice=2000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones",
      "price": 79.99,
      "category": "Electronics",
      "stock": 50,
      "image": "https://via.placeholder.com/300",
      "rating": 4.5,
      "numReviews": 120,
      "createdAt": "2023-11-15T09:00:00.000Z"
    }
  ]
}
```

### Get Single Product
**GET** `/products/:id`

Get details of a specific product.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 79.99,
    "category": "Electronics",
    "stock": 50,
    "image": "https://via.placeholder.com/300",
    "rating": 4.5,
    "numReviews": 120,
    "createdAt": "2023-11-15T09:00:00.000Z"
  }
}
```

### Create Product (Admin Only)
**POST** `/products`

Create a new product. Requires admin authentication.

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100,
  "image": "https://via.placeholder.com/300"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 100,
    "image": "https://via.placeholder.com/300",
    "rating": 0,
    "numReviews": 0,
    "createdAt": "2023-11-15T09:00:00.000Z"
  }
}
```

### Update Product (Admin Only)
**PUT** `/products/:id`

Update an existing product. Requires admin authentication.

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 75
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Updated Product Name",
    "description": "Product description",
    "price": 89.99,
    "category": "Electronics",
    "stock": 75,
    "image": "https://via.placeholder.com/300"
  }
}
```

### Delete Product (Admin Only)
**DELETE** `/products/:id`

Delete a product. Requires admin authentication.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted"
}
```

---

## Order Endpoints

### Create Order
**POST** `/orders`

Create a new order. Requires authentication.

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "Wireless Headphones",
      "quantity": 2,
      "price": 79.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Card",
  "totalPrice": 159.98
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "user": "60f7b3b3b3b3b3b3b3b3b3b3",
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Card",
    "totalPrice": 159.98,
    "isPaid": false,
    "isDelivered": false,
    "status": "Pending",
    "createdAt": "2023-11-15T09:00:00.000Z"
  }
}
```

### Get My Orders
**GET** `/orders/myorders`

Get all orders for the current user. Requires authentication.

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "orderItems": [...],
      "totalPrice": 159.98,
      "isPaid": true,
      "isDelivered": false,
      "status": "Processing",
      "createdAt": "2023-11-15T09:00:00.000Z"
    }
  ]
}
```

### Get Order By ID
**GET** `/orders/:id`

Get details of a specific order. Requires authentication.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Card",
    "totalPrice": 159.98,
    "isPaid": true,
    "paidAt": "2023-11-15T09:05:00.000Z",
    "isDelivered": false,
    "status": "Processing",
    "createdAt": "2023-11-15T09:00:00.000Z"
  }
}
```

### Get All Orders (Admin Only)
**GET** `/orders`

Get all orders in the system. Requires admin authentication.

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Update Order Status (Admin Only)
**PUT** `/orders/:id/status`

Update order status. Requires admin authentication.

**Request Body:**
```json
{
  "status": "Shipped",
  "isDelivered": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "status": "Shipped",
    "isDelivered": false,
    ...
  }
}
```

### Update Order to Paid
**PUT** `/orders/:id/pay`

Mark order as paid. Requires authentication.

**Request Body:**
```json
{
  "id": "PAYMENT_123456",
  "status": "COMPLETED",
  "update_time": "2023-11-15T09:05:00.000Z",
  "email_address": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "isPaid": true,
    "paidAt": "2023-11-15T09:05:00.000Z",
    "paymentResult": {...},
    "status": "Processing",
    ...
  }
}
```

---

## Error Responses

All error responses follow this format:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "message": "Not authorized to access this route"
}
```

**403 Forbidden:**
```json
{
  "message": "Not authorized as admin"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Server Error"
}
```

---

## Categories

Available product categories:
- Electronics
- Clothing
- Books
- Home & Kitchen
- Sports
- Beauty
- Toys
- Other

## Order Status

Available order statuses:
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

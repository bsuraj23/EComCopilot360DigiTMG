# Testing Checklist

Use this checklist to verify all features of the E-Commerce application are working correctly.

## Backend API Testing

### User Authentication
- [ ] Register new user (POST /api/users/register)
  - Should return user object with token
  - Password should be hashed in database
- [ ] Login existing user (POST /api/users/login)
  - Should return user object with token
  - Should fail with wrong password
- [ ] Get user profile (GET /api/users/profile)
  - Should require valid JWT token
  - Should return user data without password
- [ ] Update user profile (PUT /api/users/profile)
  - Should update user information
  - Should hash new password if provided

### Product Management
- [ ] Get all products (GET /api/products)
  - Should return array of products
  - Should support search query parameter
  - Should support category filter
  - Should support price range filters
- [ ] Get single product (GET /api/products/:id)
  - Should return product details
  - Should return 404 for invalid ID
- [ ] Create product (POST /api/products) - Admin only
  - Should require admin authentication
  - Should create product with all fields
- [ ] Update product (PUT /api/products/:id) - Admin only
  - Should require admin authentication
  - Should update product fields
- [ ] Delete product (DELETE /api/products/:id) - Admin only
  - Should require admin authentication
  - Should remove product from database

### Cart Management
- [ ] Get cart (GET /api/cart)
  - Should require authentication
  - Should return user's cart with populated products
- [ ] Add to cart (POST /api/cart)
  - Should require authentication
  - Should add product to cart
  - Should update quantity if product already in cart
  - Should check stock availability
- [ ] Update cart item (PUT /api/cart)
  - Should update quantity of existing item
  - Should remove item if quantity is 0 or less
- [ ] Remove from cart (DELETE /api/cart/:productId)
  - Should remove specific product from cart
- [ ] Clear cart (DELETE /api/cart)
  - Should remove all items from cart

### Order Management
- [ ] Create order (POST /api/orders)
  - Should require authentication
  - Should create order with cart items
  - Should calculate total price
  - Should update product stock
  - Should clear user's cart
- [ ] Get user orders (GET /api/orders/myorders)
  - Should return only user's orders
  - Should include order details and items
- [ ] Get order by ID (GET /api/orders/:id)
  - Should return order details
  - Should verify user ownership or admin role
- [ ] Update order to paid (PUT /api/orders/:id/pay)
  - Should mark order as paid
  - Should update order status to Processing
- [ ] Get all orders (GET /api/orders/all) - Admin only
  - Should require admin authentication
  - Should return all orders from all users
- [ ] Update order status (PUT /api/orders/:id/status) - Admin only
  - Should update order status
  - Should mark as delivered if status is "Delivered"

## Frontend Testing

### Navigation & Layout
- [ ] Navbar displays correctly
- [ ] Logo/brand name links to home page
- [ ] Navigation links work (Home, Cart, Login, etc.)
- [ ] Cart badge shows item count
- [ ] User menu appears when logged in
- [ ] Logout functionality works
- [ ] Responsive design works on mobile

### Home Page
- [ ] Products display in grid layout
- [ ] Search bar filters products by name/description
- [ ] Category dropdown filters products
- [ ] Products show image, name, price, and stock
- [ ] Clicking product card navigates to detail page
- [ ] Loading spinner shows during data fetch
- [ ] Empty state shows when no products found

### Product Detail Page
- [ ] Product information displays correctly
- [ ] Image, name, description, price show
- [ ] Stock information visible
- [ ] Quantity selector works
- [ ] Add to Cart button works (when logged in)
- [ ] Redirects to login if not authenticated
- [ ] Out of stock products cannot be added to cart
- [ ] Success message shows after adding to cart

### Authentication
- [ ] Login page displays correctly
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Register page displays correctly
- [ ] Register with valid data creates account
- [ ] Password confirmation validation works
- [ ] Duplicate email shows error
- [ ] Redirects to home after successful auth
- [ ] Link to switch between login/register works

### Shopping Cart
- [ ] Cart displays all items
- [ ] Item images, names, prices show correctly
- [ ] Quantity can be increased
- [ ] Quantity can be decreased
- [ ] Cannot increase beyond stock limit
- [ ] Remove button removes item
- [ ] Total price calculates correctly
- [ ] Empty cart shows appropriate message
- [ ] Proceed to Checkout button works

### Checkout
- [ ] Shipping address form displays
- [ ] All form fields are required
- [ ] Payment method dropdown works
- [ ] Order summary shows correct items and total
- [ ] Place Order button creates order
- [ ] Redirects to order detail after successful order
- [ ] Shows error if order creation fails

### Order History
- [ ] My Orders page lists all user orders
- [ ] Order cards show order details
- [ ] Order status displayed with color coding
- [ ] Clicking order card navigates to detail page
- [ ] Empty state shows when no orders exist

### Order Detail
- [ ] Order information displays correctly
- [ ] Order ID, date, status show
- [ ] Shipping address displays
- [ ] Order items list with quantities and prices
- [ ] Total price shown
- [ ] Payment status visible
- [ ] Pay Now button works for unpaid orders
- [ ] Payment simulation updates order status

### Profile Page
- [ ] Profile information displays
- [ ] Edit button enables form
- [ ] All fields editable
- [ ] Can update name, email, phone
- [ ] Can update address fields
- [ ] Can change password
- [ ] Password confirmation validation
- [ ] Save button updates profile
- [ ] Cancel button returns to view mode
- [ ] Success message shows after update

### Admin Dashboard
- [ ] Only accessible by admin users
- [ ] Products and Orders tabs work
- [ ] Products tab:
  - [ ] Lists all products in table
  - [ ] Add New Product button shows form
  - [ ] Product creation form works
  - [ ] All fields validated
  - [ ] Delete button removes product
  - [ ] Confirmation dialog shows before delete
- [ ] Orders tab:
  - [ ] Lists all orders from all users
  - [ ] Shows customer name, order ID, total, status
  - [ ] Status dropdown works
  - [ ] Changing status updates order
  - [ ] Updates reflect immediately

## Edge Cases & Error Handling

- [ ] Invalid URLs show 404 or redirect
- [ ] API errors display user-friendly messages
- [ ] Network errors handled gracefully
- [ ] Token expiration redirects to login
- [ ] Form validation prevents empty submissions
- [ ] SQL injection attempts prevented (N/A for MongoDB)
- [ ] XSS attempts sanitized
- [ ] Concurrent cart updates handled
- [ ] Stock depletion during checkout handled
- [ ] Large product lists paginate or load efficiently
- [ ] Image loading errors have fallback

## Performance

- [ ] Page load time is acceptable
- [ ] Images load efficiently
- [ ] API responses are fast (<1 second)
- [ ] No memory leaks in frontend
- [ ] No excessive re-renders
- [ ] Cart updates without full page reload
- [ ] Search/filter is responsive

## Security

- [ ] Passwords are hashed in database
- [ ] JWT tokens expire after specified time
- [ ] Protected routes require authentication
- [ ] Admin routes require admin role
- [ ] User can only see their own orders
- [ ] CORS is properly configured
- [ ] Environment variables not exposed
- [ ] SQL injection not possible (MongoDB)
- [ ] XSS protection in place

## Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- [ ] Keyboard navigation works
- [ ] Forms have proper labels
- [ ] Buttons have descriptive text
- [ ] Color contrast is sufficient
- [ ] Images have alt text

## Notes

Record any issues found during testing:

```
Issue: 
Steps to reproduce:
Expected result:
Actual result:
Priority: High/Medium/Low
```

## Test Completion

- Date Tested: __________
- Tested By: __________
- Environment: Development / Staging / Production
- Overall Status: Pass / Fail / Needs Review
- Notes:

import axios from 'axios';

const getAuthHeader = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const user = JSON.parse(userInfo);
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

// Product API
export const getProducts = async (params = {}) => {
  const { data } = await axios.get('/api/products', { params });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await axios.post('/api/products', productData, {
    headers: getAuthHeader(),
  });
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await axios.put(`/api/products/${id}`, productData, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`/api/products/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
};

// Cart API
export const getCart = async () => {
  const { data } = await axios.get('/api/cart', {
    headers: getAuthHeader(),
  });
  return data;
};

export const addToCart = async (productId, quantity) => {
  const { data } = await axios.post(
    '/api/cart',
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return data;
};

export const updateCartItem = async (productId, quantity) => {
  const { data } = await axios.put(
    '/api/cart',
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await axios.delete(`/api/cart/${productId}`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const clearCart = async () => {
  const { data } = await axios.delete('/api/cart', {
    headers: getAuthHeader(),
  });
  return data;
};

// Order API
export const createOrder = async (orderData) => {
  const { data } = await axios.post('/api/orders', orderData, {
    headers: getAuthHeader(),
  });
  return data;
};

export const getUserOrders = async () => {
  const { data } = await axios.get('/api/orders/myorders', {
    headers: getAuthHeader(),
  });
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await axios.get(`/api/orders/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const updateOrderToPaid = async (id, paymentResult) => {
  const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
    headers: getAuthHeader(),
  });
  return data;
};

export const getAllOrders = async () => {
  const { data } = await axios.get('/api/orders/all', {
    headers: getAuthHeader(),
  });
  return data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await axios.put(
    `/api/orders/${id}/status`,
    { orderStatus },
    { headers: getAuthHeader() }
  );
  return data;
};

// User API
export const getUserProfile = async () => {
  const { data } = await axios.get('/api/users/profile', {
    headers: getAuthHeader(),
  });
  return data;
};

export const updateUserProfile = async (userData) => {
  const { data } = await axios.put('/api/users/profile', userData, {
    headers: getAuthHeader(),
  });
  return data;
};

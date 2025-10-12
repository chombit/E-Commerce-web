
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ Named export for Product
export interface Product {
  id?: string;
  _id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
}

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

// Cart interfaces
export interface CartItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Cart {
  _id?: string;
  user: string;
  items: Array<CartItem & { product: Product }>;
}

// Order interfaces
export interface OrderItem {
  product: string | Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  orderNotes?: string;
  paymentMethod: "card" | "paypal" | "bank_transfer";
}

export interface Order {
  _id?: string;
  id?: string;
  user: string;
  items: Array<OrderItem & { product: Product }>;
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: ShippingAddress;
  paymentInfo: {
    method: string;
    status: string;
    transactionId?: string;
  };
  orderNotes?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

// ✅ Authentication functions
const register = (userData: RegisterRequest): Promise<AuthResponse> => {
  return Api.post<AuthResponse>("/auth/register", userData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error registering:", err);
      throw err;
    });
};

const login = (credentials: LoginRequest): Promise<AuthResponse> => {
  return Api.post<AuthResponse>("/auth/login", credentials)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error logging in:", err);
      throw err;
    });
};

const getProfile = (): Promise<{ user: { id: string; username: string; email: string; role: string } }> => {
  return Api.get<{ user: { id: string; username: string; email: string; role: string } }>("/auth/profile")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching profile:", err);
      throw err;
    });
};

// ✅ Product functions
const getAllProduct = (category?: string): Promise<Product[]> => {
  const url = category && category !== 'all' ? `/products?category=${category}` : "/products";
  return Api.get<Product[]>(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching products:", err);
      throw err;
    });
};

const getByCategory = (category: string): Promise<Product[]> => {
  return Api.get<Product[]>(`/products/category/${category}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching category ${category}:`, err);
      throw err;
    });
};

const getByID = (id: string): Promise<Product> => {
  return Api.get<Product>(`/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching product ${id}:`, err);
      throw err;
    });
};

// ✅ Cart functions
const getCart = (): Promise<Cart> => {
  return Api.get<Cart>("/cart")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching cart:", err);
      throw err;
    });
};

const addToCart = (productId: string, quantity: number): Promise<Cart> => {
  return Api.post<Cart>("/cart", { productId, quantity })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding to cart:", err);
      throw err;
    });
};

const updateCartItem = (productId: string, quantity: number): Promise<Cart> => {
  return Api.put<Cart>("/cart", { productId, quantity })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error updating cart:", err);
      throw err;
    });
};

const removeFromCart = (productId: string): Promise<Cart> => {
  return Api.delete<Cart>(`/cart/item/${productId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error removing from cart:", err);
      throw err;
    });
};

const clearCart = (): Promise<{ message: string }> => {
  return Api.delete<{ message: string }>("/cart")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error clearing cart:", err);
      throw err;
    });
};

// ✅ Order functions
const getOrders = (): Promise<Order[]> => {
  return Api.get<Order[]>("/orders")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching orders:", err);
      throw err;
    });
};

const createOrder = (orderData: CreateOrderRequest): Promise<Order> => {
  return Api.post<Order>("/orders", orderData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error creating order:", err);
      throw err;
    });
};

// ✅ Default export (object with methods)
export default {
  // Auth
  register,
  login,
  getProfile,

  // Products
  getAllProduct,
  getByCategory,
  getByID,

  // Cart
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,

  // Orders
  getOrders,
  createOrder,
};

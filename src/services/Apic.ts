
import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Named export for Product
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ✅ Fetch all products
const getAllProduct = (): Promise<Product[]> => {
  return Api.get<Product[]>("/products")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching products:", err);
      throw err; // re-throw so the caller can handle it
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

// ✅ Fetch single product by ID
const getByID = (id: number): Promise<Product> => {
  return Api.get<Product>(`/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching product ${id}:`, err);
      throw err;
    });
};

// ✅ Default export (object with methods)
export default {
  getAllProduct,
  getByCategory,
  getByID,
};

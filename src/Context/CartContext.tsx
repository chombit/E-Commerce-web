import { useMemo, useState } from "react";
import { type ReactNode } from "react";
import { createContext } from "react";

// Context type
export interface CartContext {
  cartItems: CartItem[];
  Adding_Products: (product: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Create context
export const CartCont = createContext<CartContext | null>(null);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add product logic
  const Adding_Products = (product: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );
  const tax = useMemo(() => +(subtotal * 0.1).toFixed(2), [subtotal]);
  const shipping = useMemo(() => (subtotal > 100 ? 0 : cartItems.length > 0 ? 9.99 : 0), [subtotal, cartItems.length]);
  const total = useMemo(() => +(subtotal + tax + shipping).toFixed(2), [subtotal, tax, shipping]);

  const value = { cartItems, Adding_Products, updateQuantity, removeItem, clearCart, subtotal, tax, shipping, total };

  return (
    <CartCont.Provider value={value}>
      {children}
    </CartCont.Provider>
  );
}

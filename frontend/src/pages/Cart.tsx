import { useContext } from "react";
import { CartCont } from "../Context/CartContext";
import CartItem from "../component/cart/CartItem";
import CartSummary from "../component/cart/CartSummary";

function Cart() {
  const cart = useContext(CartCont);
  if (!cart) return null;

  const isEmpty = cart.cartItems.length === 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        <section>
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {isEmpty ? (
            <div className="p-8 text-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Your cart is empty.</div>
          ) : (
            <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {cart.cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;

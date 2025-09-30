import { useContext } from "react";
import { CartCont } from "../../Context/CartContext";

function CartSummary() {
  const cart = useContext(CartCont);
  if (!cart) return null;

  const { subtotal, tax, shipping, total, clearCart, cartItems } = cart;
  const isEmpty = cartItems.length === 0;

  return (
    <aside className="h-fit p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Shipping is free for orders over $100.</p>

      <div className="mt-4 space-y-2">
        <button
          disabled={isEmpty}
          className={`w-full py-2 rounded-lg font-semibold ${isEmpty ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Proceed to Checkout
        </button>

        <button
          disabled={isEmpty}
          onClick={clearCart}
          className={`w-full py-2 rounded-lg font-semibold border ${isEmpty ? 'text-gray-500 border-gray-300 cursor-not-allowed' : 'text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10'}`}
        >
          Clear Cart
        </button>
      </div>
    </aside>
  );
}

export default CartSummary;



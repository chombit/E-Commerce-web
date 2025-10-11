import { useContext } from "react";
import { CartCont, type CartItem as CartItemType } from "../../Context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const cart = useContext(CartCont);
  if (!cart) return null;

  const { updateQuantity, removeItem } = cart;
  const lineTotal = +(item.price * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-contain bg-white rounded-md"
      />
      <div className="flex-1 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              −
            </button>
            <span className="px-4 py-1.5 text-gray-900 dark:text-white min-w-[2ch] text-center">
              {item.quantity}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Line total</p>
            <p className="font-semibold text-gray-900 dark:text-white">${lineTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;



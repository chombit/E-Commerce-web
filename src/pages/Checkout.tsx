import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartCont } from '../Context/CartContext';

const Checkout: React.FC = () => {
  
  const cart = useContext(CartCont);
  const cartItems = cart?.cartItems ?? [];
  const total = cart?.total ?? 0;
  const clearCart = cart?.clearCart ?? (() => {});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    setProcessing(true);
    
    try {
      const customerInfo = {
        name,
        email,
        address
      };
      
      // Mock checkout - just clear cart and navigate
      console.log('Checkout:', customerInfo, 'Total:', total);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <form onSubmit={submit} className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping Information</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm">Full Name</span>
            <input className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block">
            <span className="text-sm">Email</span>
            <input type="email" className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <span className="text-sm">Address</span>
            <input className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className={`w-full py-2 rounded-lg font-semibold ${processing ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'} text-white`} disabled={processing}>
          {processing ? 'Processing...' : `Pay $ ${total.toFixed(2)}`}
        </button>
      </form>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="font-semibold text-gray-900 dark:text-white">Order Summary</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Total: $ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Checkout;

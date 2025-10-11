import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartCont } from '../Context/CartContext';
import ApiService from '../services/Apic';
import type { CreateOrderRequest, ShippingAddress } from '../services/Apic';

const Checkout: React.FC = () => {

  const cart = useContext(CartCont);
  const cartItems = cart?.cartItems ?? [];
  const total = cart?.total ?? 0;
  const clearCart = cart?.clearCart ?? (() => {});
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ethiopia'
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank_transfer'>('card');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleInputChange = (field: keyof ShippingAddress) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate required fields
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.address ||
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill in all required shipping information');
      return;
    }

    setProcessing(true);

    try {
      const orderData: CreateOrderRequest = {
        shippingAddress,
        orderNotes: orderNotes || undefined,
        paymentMethod
      };

      const order = await ApiService.createOrder(orderData);

      // Clear cart after successful order
      clearCart();

      // Navigate to order success page with order ID
      navigate(`/order-success/${order._id || order.id}`);
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
            <input
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
              value={shippingAddress.name}
              onChange={handleInputChange('name')}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
              value={shippingAddress.email}
              onChange={handleInputChange('email')}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Address</span>
            <input
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
              value={shippingAddress.address}
              onChange={handleInputChange('address')}
              required
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm">City</span>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                value={shippingAddress.city}
                onChange={handleInputChange('city')}
                required
              />
            </label>
            <label className="block">
              <span className="text-sm">State/Region</span>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                value={shippingAddress.state}
                onChange={handleInputChange('state')}
                required
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm">ZIP Code</span>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                value={shippingAddress.zipCode}
                onChange={handleInputChange('zipCode')}
                required
              />
            </label>
            <label className="block">
              <span className="text-sm">Country</span>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                value={shippingAddress.country}
                onChange={handleInputChange('country')}
                required
              >
                <option value="Ethiopia">Ethiopia</option>
                <option value="Kenya">Kenya</option>
                <option value="Sudan">Sudan</option>
                <option value="Somalia">Somalia</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-sm">Order Notes (Optional)</span>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Any special delivery instructions..."
            />
          </label>
          <label className="block">
            <span className="text-sm">Payment Method</span>
            <select
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal' | 'bank_transfer')}
              required
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            processing ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={processing}
        >
          {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </form>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Items ({cartItems.length})</span>
            <span className="text-gray-900 dark:text-white">${(total - (cart?.tax || 0) - (cart?.shipping || 0)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white">${(cart?.tax || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white">
              {(cart?.shipping || 0) === 0 ? 'Free' : `$${(cart?.shipping || 0).toFixed(2)}`}
            </span>
          </div>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <div className="flex justify-between text-base font-semibold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Shipping is free for orders over $100.
        </p>
      </div>
    </div>
  );
};

export default Checkout;

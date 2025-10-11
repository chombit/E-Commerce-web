import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, you might want to fetch the order details here
    // For now, we'll just show a success message
  }, [orderId]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your order. We'll send you shipping updates at your email address.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-8 text-left">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
              <span className="font-mono text-gray-900 dark:text-white">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm">
                Confirmed
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
              <span className="text-gray-900 dark:text-white">3-5 business days</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
import { Heart, Shield, Zap, Globe, Truck, Star, RefreshCcw } from "lucide-react";

function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Tina-Mart</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted partner in online shopping, delivering quality products and exceptional service since 2014
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl border border-purple-600 hover:bg-purple-50 transition-colors">
              Shop Now
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Contact Us
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">1M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Products Sold</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
        </div>

        {/* Story and Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Our Story */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2014, B-Shop started as a small online store with a simple mission: to make quality products accessible to everyone, everywhere.
              </p>
              <p>
                What began as a passion project has grown into a global e-commerce platform serving millions of customers across 50+ countries. We've built our success on the foundation of trust, quality, and exceptional customer service.
              </p>
              <p>
                Today, we continue to innovate and expand our product range while maintaining our core values of transparency, reliability, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Our Mission and Vision */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-100">
                To provide exceptional online shopping experiences through innovative technology, quality products, and outstanding customer service.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-blue-100">
                To become the world's most trusted and customer-centric e-commerce platform, making quality products accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Customer First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We put our customers at the heart of everything we do, ensuring their satisfaction is our top priority.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Trust & Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your data and payments are protected with industry-leading security measures and encryption.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We continuously innovate to bring you the latest products and cutting-edge shopping experiences.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Serving customers worldwide with fast, reliable shipping and localized support.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose B-Shop Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Why Choose Tina-Mart?</h2>
            <p className="text-gray-600 dark:text-gray-300">We're committed to providing the best shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Free shipping on orders over $100 with fast and reliable delivery worldwide.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your payment information is protected with bank-level security and encryption.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                30-day hassle-free return policy with free return shipping for your convenience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We only sell high-quality products from trusted brands with satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-6 text-purple-100">
            Join millions of satisfied customers and discover amazing products today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Browse Products
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border border-white hover:bg-gray-50 transition-colors">
              Explore Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

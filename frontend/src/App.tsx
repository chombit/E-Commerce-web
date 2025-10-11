
import Home from "./pages/Home"
import Navigation from "./component/layout/Navigation"
import { Routes, Route } from "react-router-dom"
import Footer from "./component/layout/Footer"
import React, { Suspense, lazy } from "react"
import Catagory from "./pages/Catagories"
const ProductPage = lazy(() => import("./pages/Product"))
const ProductDetail = lazy(() => import("./pages/productDetail"))
const CartPage = lazy(() => import("./pages/Cart"))
const CheckoutPage = lazy(() => import("./pages/Checkout"))
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccess"))
const LoginPage = lazy(() => import("./pages/Login"))
const RegisterPage = lazy(() => import("./pages/Register"))
const ContactPage = lazy(() => import("./pages/Contact"))
const AboutPage = lazy(() => import("./pages/About"))

function App() {
  return (
    <>
       <div className="min-h-screen flex flex-col">
       <Navigation />
       <main className="flex-1 bg-gray-50">
       <Suspense fallback={<div className="p-6">Loading...</div>}>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
           <Route path="/catagory" element={<Catagory />} />
      </Routes>
      </Suspense>
       </main>
   
        <Footer />
        </div>
    </>
   
   
   

  )

}

export default App;
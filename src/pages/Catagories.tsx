import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Catagory(){
    return(
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center">
            <h1 className="font-bold text-3xl sm:text-4xl">Product Categories</h1>
            <p className="mt-2 text-base sm:text-lg text-gray-700 dark:text-gray-300">Explore our wide range of product categories and find exactly what you're looking for</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
                <li className=" rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 p-8">
                    <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-800  ml-13 mb-2 w-17 h-17 "><p className="flex justify-center pt-4 font-bold text-white text-2xl">E</p>
                    </div> <p className="font-bold text-lg">Electronics</p>
                <span className="font-light text-sm text-gray-600 dark:text-gray-300">Discover Amazing Electronics</span> 
                <div className="pt-6">
                <Link to="/product?category=electronics" className="text-blue-700 dark:text-blue-400 inline-flex items-center">Explore <ArrowRight className="ml-2"/></Link>
                </div>
                </li>
                <li className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 p-8"><div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-800  ml-13 mb-2 w-17 h-17  "><p className="flex justify-center pt-4 font-bold text-white text-2xl">J</p></div><p className="font-bold text-lg">Jewelery</p> <span className="font-light text-sm text-gray-600 dark:text-gray-300">Discover Stunning Pieces</span>
                <div className="pt-6"><Link to="/product?category=jewelery" className="text-blue-700 dark:text-blue-400 inline-flex items-center">Explore <ArrowRight className="ml-2"/></Link></div></li>
                <li className=" rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 p-8"><div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-800  ml-13 mb-2 w-17 h-17  "><p className="flex justify-center pt-4 font-bold text-white text-2xl">M</p></div><p className="font-bold text-lg">Men's clothing</p><span className="font-light text-sm text-gray-600 dark:text-gray-300">Discover Amazing Apparel</span>
                <div className="pt-6"><Link to="/product?category=men's clothing" className="text-blue-700 dark:text-blue-400 inline-flex items-center">Explore <ArrowRight className="ml-2"/></Link></div></li>
                <li className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 p-8"><div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-800  ml-13 mb-2  w-17 h-17"><p className="flex justify-center pt-4 font-bold text-white text-2xl">W</p></div><p className="font-bold text-lg">Women's clothing</p><span className="font-light text-sm text-gray-600 dark:text-gray-300">Discover Amazing Apparel</span>
                <div className="pt-6"><Link to="/product?category=women's clothing" className="text-blue-700 dark:text-blue-400 inline-flex items-center">Explore <ArrowRight className="ml-2"/></Link></div></li>
            </ul>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="rounded-2xl border-1 bg-gradient-to-r from-blue-700 to-purple-800 text-white p-6 sm:p-8 text-center">
              <p className="text-2xl sm:text-3xl font-bold">Can't find what you're looking for?</p>
              <p className="mt-2">Browse all our products and discover something new</p>
              <div className="mt-4 flex justify-center">
                <Link to="/product" className="border-1 bg-white text-blue-700 dark:text-blue-700 font-bold inline-flex items-center px-4 py-2 rounded-2xl">
                  View All Product <ArrowRight className="ml-2"/>
                </Link>
              </div>
            </div>
        </div>
         
        </div>
    )
}
export default Catagory


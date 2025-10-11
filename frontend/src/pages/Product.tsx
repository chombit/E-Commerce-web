import { useEffect, useState, useContext } from "react"
import { ShoppingCart } from "lucide-react"

import Api, { type Product } from "../services/Apic";
import { Link, useLocation } from "react-router-dom";
import { CartCont } from "../Context/CartContext";


function Product(){
   const [post, setPost] = useState<Product[]>([]);
   const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<string | number>("")
    const [maxPrice, setMaxPrice] = useState<string | number>("")
   const cart = useContext(CartCont);
   const location = useLocation();
       function limi(title:string){
      if(title.length >25){
        return title.substring(0,20)+'...'
      }else{
        return title;
      }
    }

  function limitation(description:string){
      if (description.length>100 ){
        return description.substring(0,80) +'...'
      }
      else{
        return description;
      }
  }
  
  useEffect(() => {
   Api.getAllProduct()
      .then((data) => {
        setPost(data)
        setAllProducts(data)
      })
      .catch((err) => console.error(err));
  }, []);
  // Apply category and search filters from query params when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const queryParam = params.get('q');
    if (allProducts.length > 0) {
      let filtered = [...allProducts];
      if (categoryParam) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase());
      }
      if (queryParam && queryParam.trim() !== '') {
        const q = queryParam.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
      }
      setPost(filtered);
    }
  }, [location.search, allProducts]);
    const clearFilters = () => {
      setMinPrice("")
      setMaxPrice("")
      setPost(allProducts)
    }
    
   return(
      <div className="bg-gray-50 dark:bg-gray-900 dark:text-white">
        <div className="w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
  <h1 className="font-bold text-3xl ml-20 ">Products</h1>
  <p className="mt-2 ml-20">Discover our wide range of products</p>
  <div className="mt-6 ml-20 bg-white border-1 shadow-lg border-white rounded-xl dark:bg-gray-800 dark:border-gray-800"> 
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <li>
      <span>Search</span>
     <form action="" className=" mt-2 ">
      <input className="border-1 border-black/20 rounded-xl p-2 pl-4 w-full dark:bg-gray-700 dark:border-gray-900" type="text" placeholder="Search product..."/>
     </form>
      </li>
      <li>
<span>Categories</span><br />
<select
          className="w-full  mt-2  dark:bg-gray-700 dark:border-gray-900 dark:text-white rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all") {
              setPost(allProducts);
            } else {
              const filtered = allProducts.filter((p) => p.category.toLowerCase() === value);
              setPost(filtered);
            }
          }}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </li>
      <li >
        <span >Sort</span> <br />
   <select
          className="w-full mt-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-900 dark:text-white bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
           onChange={(f) => {
    const value = f.target.value;
    let sorted = [...allProducts]; // copy so we don’t mutate the original

    if (value === "Name") {
      // Sort by product title alphabetically A–Z
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "a-z") {
      // Sort by price low → high
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "z-a") {
      // Sort by price high → low
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "rate") {
      // Sort by rating (highest first)
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setPost(sorted);
  }}
        >
          <option value="Name">Name A-Z</option>
          <option value="a-z">Price:Low-High</option>
          <option value="z-a">Price:High-Low</option>
          <option value="rate">Rating</option>

        </select>
      </li>
      <li>
        <span className="block text-sm font-semibold text-gray-700 dark:text-white">Price Range</span>
        <div className="flex items-center space-x-4 mt-2">
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              className="w-full sm:w-[140px] rounded-lg border  dark:border-gray-0 dark:bg-gray-700 dark:text-white border-gray-800 bg-white px-4 py-2 pr-8 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              className="w-full sm:w-[140px] rounded-lg border dark:bg-gray-700 dark:border-gray-900 dark:text-white dark:border-gray-300 border-gray-800 bg-white px-4 py-2 pr-8 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            />
          
          </div>
        </div>
        <button type="button" onClick={clearFilters} className=" text-gray-400  mt-4 underline hover:text-black">
          Clear Filters
        </button>
      </li>
    </ul>
        </div>
        <div className=" mx-auto px-4 sm:px-6 lg:px-2 mt-8 dark:border-gray-800">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[1500px]">
     
        {
          post.map((pon)=> {
            const inCart = !!cart?.cartItems.some((i) => i.id === pon.id.toString());
            return (
             <div key={pon.id} className="border-0   rounded-2xl dark:shadow-gray-700 dark:bg-gray-800 dark:text-white bg-white shadow-md shadow-gray-400 p-6 transition-transform duration-200 hover:-translate-y-2">
      <p
        className={`inline-block self-start border-0 rounded-3xl px-3 py-1 text-[12px] text-white font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-900`}
      >
        {pon.category}
      </p>
      <img className="w-full h-[250px] object-contain hover:scale-105" src={pon.image} alt="" />
  <Link to={`/product/${pon.id}`} className=" text-black font-bold hover:underline text-blue-600">
  {limi(pon.title)}
</Link>

      
      <div className="flex items-center gap-2 text-sm pl-3">
        <span className="text-yellow-800">⭐⭐⭐☆☆ {pon.rating.rate}</span>
        <span className="text-gray-500 text-xs">({pon.rating.count})</span>
      </div>
      <p className="pl-3 pt-1 text-[22px] font-bold text-green-500">${pon.price}</p>
      <p className="p-3 text-black/60 dark:text-white" dangerouslySetInnerHTML={{ __html: limitation(pon.description) }} />
      <button
        onClick={() =>
          !inCart && cart?.Adding_Products({
            id: pon.id.toString(),
            name: pon.title,
            price: pon.price,
            image: pon.image,
            quantity: 1,
          })
        }
        disabled={inCart}
        className={`flex items-center justify-center text-white font-bold  p-2 ml-2 rounded-2xl w-full ${inCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-blue-900 hover:scale-105'}`}
      >
  <ShoppingCart className="mr-2" /> {inCart ? 'In Cart' : 'Add to Cart'}
</button>

             </div>
            )
          })
        }
          

        
        </div>
        </div>
        </div>
      </div>
    );
}
export default Product  ;
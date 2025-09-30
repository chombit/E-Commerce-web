
import { Link } from 'react-router-dom';

import { ArrowRight, Check, Mail, RefreshCcw, Shield, ShoppingCart, Star, Truck, Sparkles, Zap } from "lucide-react";
import { useEffect, useState,useContext, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Api, { type Product } from "../services/Apic";



import { CartCont } from "../Context/CartContext";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function Button({ children, className = "", size = "md", variant = "solid", onMouseEnter, onMouseLeave }: ButtonProps) {
  const sizeClasses = size === "lg" ? "px-6 py-3 text-base" : size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variantClasses = variant === "outline"
    ? "bg-transparent border text-current"
    : "text-white";
  return (
    <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${sizeClasses} ${variantClasses} rounded-xl ${className}`}>
      {children}
    </button>
  );
}

function FloatingElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 shadow">
        <div>{icon}</div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}
function Home() {
  const cartt=useContext(CartCont)
  const [post, setPost] = useState<Product[]>([]);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState<number>(0);
  const features: { icon: ReactNode; title: string; desc: string }[] = [
    { icon: <Truck className="w-5 h-5 text-emerald-600" />, title: "Fast Delivery", desc: "Get your orders quickly and reliably." },
    { icon: <Shield className="w-5 h-5 text-blue-600" />, title: "Secure Payments", desc: "Your information stays safe with us." },
    { icon: <Sparkles className="w-5 h-5 text-purple-600" />, title: "Curated Picks", desc: "Handpicked products you will love." }
  ];
 
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
      .then((data) => setPost(data))
      .catch((err) => console.error(err));
  }, []);




  return (

    <>
  <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        <div className="absolute inset-0 overflow-hidden">
          
          <FloatingElement delay={0}>
            <div className="w-64 h-64 bg-gradient-to-br from-brand/20 to-purple-500/20 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="w-32 h-32 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl" />
          </FloatingElement>
          
          <FloatingElement delay={0.5}>
            <div className="top-20 left-10 text-brand/30">
              <ShoppingCart className="w-8 h-8" />
            </div>
          </FloatingElement>
          <FloatingElement delay={1.5}>
            <div className="top-40 right-20 text-blue-400/30">
              <Star className="w-6 h-6" />
            </div>
          </FloatingElement>
          <FloatingElement delay={2.5}>
            <div className="bottom-40 left-1/4 text-purple-400/30">
              <Sparkles className="w-7 h-7" />
            </div>
          </FloatingElement>
          
          <div className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)] opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">           
            <div className="space-y-8">             
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light border border-brand/20"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">New Collection Available</span>
              </motion.div>             
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <motion.span 
                    className="bg-gradient-to-r from-brand via-purple-600 to-blue-600 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 200%' }}>
                    Elevate Your
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-gray-900 dark:text-white"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    Everyday
                  </motion.span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Discover curated products, premium quality, and incredible value. 
                <motion.span 
                  className="font-semibold text-brand dark:text-brand-light"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {" "}What's trending right now at TinaMart.
                </motion.span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/products">
                    <Button 
                      size="lg" 
                      className="group relative overflow-hidden bg-gradient-to-r from-brand to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onMouseEnter={() => setHoveredButton('shop')}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                       <Link to="/product"> Shop Now</Link> 
                        <motion.div
                          animate={{ x: hoveredButton === 'shop' ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: hoveredButton === 'shop' ? '0%' : '-100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/products?sort=price_desc">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-brand/50 text-brand dark:border-brand-light dark:text-brand-light hover:bg-brand/10 hover:border-brand transition-all duration-300 backdrop-blur-sm"
                      onMouseEnter={() => setHoveredButton('deals')}
                      onMouseLeave={() => setHoveredButton(null)}>
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Explore Deals
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-12">
                <div className="relative h-32">
                  <AnimatePresence mode="wait">
                    <FeatureCard 
                      key={currentFeatureIndex}
                      icon={features[currentFeatureIndex].icon}
                      title={features[currentFeatureIndex].title}
                      desc={features[currentFeatureIndex].desc}
                    />
                  </AnimatePresence>
                </div>
                
                <div className="flex justify-center gap-2 mt-4">
                  {features.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentFeatureIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentFeatureIndex 
                          ? 'bg-brand scale-125' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              <motion.div
                className="relative aspect-square max-w-lg mx-auto"
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >               
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                
                <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-brand to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <ShoppingCart className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Your Next Favorite
                  </motion.h3>
                  
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 px-4"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Product is just one click away
                  </motion.p>
                               
                  <motion.div
                    className="absolute -inset-4 rounded-3xl border-2 border-brand/30"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl shadow-xl opacity-80"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1
                }}
              />
              
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-xl opacity-80"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 2
                }}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white dark:fill-gray-800" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
      </div>
      </section>
   
    <div className="bg-white/50 dark:bg-gray-900 dark:text-white">
      <div >
    <h1 className="pt-[20px] font-bold text-3xl flex justify-center items-center ">why Choose Tina-Mart</h1>
    <p className="flex justify-center items-center p-3 text-xl">We provide the best shopping experience with these features</p>
    <ul className="flex pl-[350px]   space-x-7 mt-10">
     <li className="px-[40px] shadow-sm  bg-white shadow-gray-400 border-0 rounded-2xl py-14 mr-6 hover:transform transition scale-100 hover:shadow-lg dark:bg-gray-800"> <div className="bg-blue-100 w-15 h-15 p-3 mb-7  ml-20  rounded-full">
        <Truck className="w-8 h-8 text-blue-500 " />
      </div> <span className="flex justify-center">Free Shipping</span>

Free shipping on orders over  <br /><span className="flex justify-center">$100</span></li>
        <li className="px-[40px] bg-white shadow-sm shadow-gray-400 border-0 rounded-2xl py-14 mr-6 hover:transform transition scale-100 hover:shadow-lg dark:bg-gray-800"><div className="bg-blue-100 w-15 h-15 p-3  mb-7  ml-20  rounded-full">
          <Shield className="w-8 h-8 text-blue-500" />
        </div><span className="flex justify-center">Secure Payment</span>

Your payment information is <br /> <span className="flex justify-center">secure</span></li>
          <li className="px-[60px] bg-white shadow-sm shadow-gray-400 border-0 rounded-2xl py-14 mr-6 hover:transform transition scale-100 hover:shadow-lg dark:bg-gray-800"> <div className="bg-blue-100 w-15 h-15 p-3  mb-7  ml-15 rounded-full">
          <RefreshCcw className="w-8 h-8 text-blue-500" />
        </div> <span className="flex justify-center">Easy Returns</span> 

30-day return policy</li>
            <li className="px-[50px] bg-white border-0 shadow-sm shadow-gray-400 rounded-2xl py-14 mr-6 hover:transform transition scale-100 hover:shadow-lg dark:bg-gray-800">  <div className="bg-blue-100 p-3  w-15 h-15   mb-7  ml-15 rounded-full">
          <Star className="w-8 h-8 text-blue-500" />
        </div><span className="flex justify-center"> Quality Products</span> 

Only the best products <br /> <span className="flex justify-center">for you</span></li>
    </ul>
      </div>
      <div>
        <div className="mt-30">
          <h1 className="font-bold text-2xl flex justify-center ">Featured Product </h1>
          <p className="flex justify-center pt-4">Check out our most popular products</p>
        </div>
{/* First 4 Products */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch p-6">
  {post.slice(0, 4).map((pon) => (
     <div key={pon.id} className="border-0 rounded-2xl bg-white shadow-md shadow-gray-400 p-4 dark:bg-gray-800 dark:text-white">
      <p
        className={`inline-block self-start border-0 rounded-3xl px-3 py-1 text-[12px] text-white font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-900`}
      >
        {pon.category}
      </p>
      <img className="w-full h-[220px] object-contain" src={pon.image} alt="" />
      <h1 className="pl-3 py-1 font-bold" dangerouslySetInnerHTML={{ __html: limi(pon.title) }} />
      <div className="flex items-center gap-2 text-sm pl-3">
        <span className="text-yellow-800">⭐ {pon.rating.rate}</span>
      </div>
      <p className="pl-3 pt-1 text-[25px] font-bold text-green-500">${pon.price}</p>
      <p className="p-3 text-black/60 dark:text-white" dangerouslySetInnerHTML={{ __html: limitation(pon.description) }} />
      
      {/* ✅ Add to Cart Button */}
      <button
        onClick={() =>
          !cartt?.cartItems.some((i)=> i.id===pon.id.toString()) && cartt?.Adding_Products({
            id: pon.id.toString(),
            name: pon.title,
            price: pon.price,
            image: pon.image,
            quantity: 1,
          })
        }
        disabled={cartt?.cartItems.some((i)=> i.id===pon.id.toString())}
        className={`flex items-center justify-center text-white font-bold  p-2 ml-2 rounded-2xl w-full ${cartt?.cartItems.some((i)=> i.id===pon.id.toString()) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-blue-900'}`}
      >
        <ShoppingCart className="mr-[10px]" /> {cartt?.cartItems.some((i)=> i.id===pon.id.toString()) ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  ))}
</div>
</div>

{/* Second 4 Products */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch p-6 ">
  {post.slice(4, 8).map((pon) => (
    <div className="border-0 rounded-2xl bg-white shadow-md shadow-gray-400 p-4 dark:bg-gray-800 dark:text-white">
      <p
        className={`inline-block self-start border-0 rounded-3xl px-3 py-1 text-[12px] text-white font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-900`}
      >
        {pon.category}
      </p>
      <img className="w-full h-[220px] object-contain" src={pon.image} alt="" />
      <h1 className="pl-3 py-1 font-bold" dangerouslySetInnerHTML={{ __html: limi(pon.title) }} />
      <div className="flex items-center gap-2 text-sm pl-3">
        <span className="text-yellow-800">⭐ {pon.rating.rate}</span>
      </div>
      <p className="pl-3 pt-1 text-[25px] font-bold text-green-500">${pon.price}</p>
      <p className="p-3 text-black/60 dark:text-white" dangerouslySetInnerHTML={{ __html: limitation(pon.description) }} />
      <button onClick={() =>
          cartt?.Adding_Products({
            id: pon.id.toString(),
            name: pon.title,
            price: pon.price,
            image: pon.image,
            quantity: 1,
          })
        } className="flex items-center justify-center text-white font-bold bg-gradient-to-r from-pink-500 to-blue-900 p-2 ml-2 rounded-2xl w-full">
  <ShoppingCart className="mr-2" /> Add to Cart
</button>

    </div>
  ))}
  <div className="fex justify-center ml-[500px]">
      <Link to="/product">
  <button className="bg-blue-600 min-w-[180px] h-[48px] items-center px-4 text-white rounded-2xl flex justify-center">
    View Product <ArrowRight className="text-white ml-2"/>
  </button></Link>
  </div>
</div>
</div>

      </div>
      <div className="h-[600px] bg-gradient-to-tl from-pink-600 to-blue-900 ">
        <div className="pl-[870px] pt-[80px]"> <span className="bg-white/40 w-20 h-20 flex justify-center items-center rounded-full"><Mail className="text-white w-8 h-8"/></span> 
       
      </div> 
      <p className="font-bold text-5xl ml-[790px] text-white mt-3">Stay Updated</p>
      <p className="ml-[680px] text-2xl pt-2 text-white/75">Get exclusive deals, new product alerts, and insider tips <br /> <span className="pl-[100px]">delivered to your inbox</span></p>
   <div className="flex ml-[690px] mt-[40px]">
    <form action="
    ">
      <input className="border-1 p-[15px] text-white  border-white rounded-2xl w-[400px]" type="text" placeholder ="Enter your email address" />
    </form>
    <button className=" flex justify-center bg-white text-blue-800 font-bold  ml-6 p-4 rounded-2xl w-[150px]">
      Subscribe <ArrowRight className="ml-3.5"/> 
    </button>
   </div>

   <ul className=" flex ml-[700px] space-x-7 mt-6 text-[15px] ">
    <li className="flex text-blue-300/80"><Check className="mr-3 flex items-baseline w-4 h-7" />No spam, ever</li>
     <li className="flex text-blue-300/80"><Check className="mr-3 flex items-baseline w-4 h-7" />Unsubscribe anytime</li>
      <li className="flex text-blue-300/80"><Check className="mr-3 flex items-baseline w-4 h-7" />Weekly updates</li>
   </ul>
   <div className="mt-[20px]">
    <ul className="flex ml-[580px] space-x-60">
      <li className="text-4xl font-bold text-white">10K+ <br /><span className="text-white/55 text-[15px]">Subscribers</span></li>
      <li  className="text-4xl font-bold text-white">98% <br /><span className="text-white/55 text-[15px]">Open Rate</span></li>
      <li className="text-4xl font-bold text-white">24h <br /> <span className="text-white/55 text-[15px]">Response Time</span></li>
    </ul>
   </div>

      </div>
    </div>
       </>
  );
}

export default Home;

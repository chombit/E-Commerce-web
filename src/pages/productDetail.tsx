import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Api, { type Product } from "../services/Apic";
import { ShoppingCart } from "lucide-react";
import { CartCont } from "../Context/CartContext";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cart = useContext(CartCont);

  useEffect(() => {
    if (!id) return;

    Api.getByID(Number(id))
      .then((data) => {
        setPost(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product.");
      });
  }, [id]);

  if (error) return <div className="max-w-6xl mx-auto p-6">{error}</div>;
  if (!post) return <div className="max-w-6xl mx-auto p-6">Loading...</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-start justify-center">
          <img src={post.image} alt={post.title} className="w-full max-w-md object-contain dark:bg-gray-800 bg-white rounded-xl shadow" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-green-600 text-xl font-semibold mt-2">${post.price}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{post.description}</p>
          <div className="mt-4 text-sm text-white inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-900">{post.category}</div>
        <button
          onClick={() => cart?.Adding_Products({
            id: String(post.id),
            name: post.title,
            price: post.price,
            image: post.image,
            quantity: 1,
          })}
          className=" mt-[50px] flex items-center justify-center text-white font-bold bg-gradient-to-r from-pink-500 to-blue-900 p-2 ml-2 rounded-2xl w-[350px] hover:scale-105">
  <ShoppingCart className="mr-2" /> Add to Cart
</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

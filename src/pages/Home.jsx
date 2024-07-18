import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import "./styles/Home.css";
import Spinner from "../components/Spinner";
import { useContextValue } from "../context/AuthProvider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContextValue();

  const fetchAllProducts = async () => {
    try {
      const PRODUCTS_API = "https://fakestoreapi.com/products";
      const response = await fetch(PRODUCTS_API);
      const allProducts = await response.json();
      setProducts(allProducts);
      toast.success("Successfully fetched all products.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // On Mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} userId={userId} />
        ))}
      </div>
      {/* Loader */}
      {loading && <Spinner loading={loading} />}
    </>
  );
};

export default Home;

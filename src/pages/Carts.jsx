import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CartProductCard from "../components/CartProductCard";
import Spinner from "../components/Spinner";
import { useProductContextValue } from "../context/ProductContextProvider";
import { useContextValue } from "../context/AuthProvider";
import "./styles/Home.css";
import OrderSummary from "../components/OrderSummary";

const Carts = () => {
  const [loading, setLoading] = useState(true);
  const [userInteraction, setUserInteraction] = useState(false);

  const { cartItems, setCartItems } = useProductContextValue();
  const { userId } = useContextValue();

  const getCartItems = async () => {
    try {
      const q = query(collection(db, "carts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const allCarts = querySnapshot?.docs?.map((doc) => {
        return { itemId: doc.id, ...doc.data() };
      });
      setCartItems(allCarts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [userInteraction]);

  return (
    <>
      {cartItems.length ? (
        <div className="product-container">
          <OrderSummary products={cartItems} />
        </div>
      ): <h2 className="header-one">No Products Added In cart...</h2>}
      <div className="product-container">
        {cartItems.map((item, index) => (
          <CartProductCard
            key={index}
            product={item}
            setUserInteraction={setUserInteraction}
          />
        ))}
      </div>
      {/* Loader */}
      {loading && <Spinner loading={loading} />}
    </>
  );
};

export default Carts;

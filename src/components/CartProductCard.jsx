import React, { useEffect, useState } from "react";
import "./CartProductCard.css";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

const CartProductCard = ({ product, setUserInteraction }) => {
  const [quantity, setQuantity] = useState(product.count);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const removeFromCart = async () => {
    try {
      await deleteDoc(doc(db, "carts", product.itemId));
      setUserInteraction((prev) => !prev);
      toast.success("Item removed from cart.");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async () => {
    try {
      // Update The Count
      const docRef = doc(db, "carts", product.itemId);
      const data = {
        ...product,
        count: quantity,
      };
      setDoc(docRef, data);
      setUserInteraction((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (quantity && quantity !== product.count) {
      updateCartItem();
    }
  }, [quantity]);

  return (
    <div className="new-product-card">
      <img
        src={product.image}
        alt={product.title}
        className="new-product-image"
      />
      <div className="new-product-info">
        <h2 className="new-product-title">{product.title}</h2>
        <p className="new-product-category">{product.category}</p>
        <div className="new-product-details">
          <p className="new-product-price">${product.price}</p>
          <div className="new-quantity-controls">
            <button onClick={decrementQuantity}>-</button>
            <span>{product?.count}</span>
            <button onClick={incrementQuantity}>+</button>
          </div>
        </div>
        <button className="new-remove-button" onClick={removeFromCart}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;

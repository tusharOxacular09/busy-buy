import React from "react";
import "./ProductCard.css";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, userId }) => {
  const navigate = useNavigate();

  const addProductToCart = async () => {
    try {
      // First check if that item already in the cart or not.
      // If already there then jsut increase the count
      let q = query(collection(db, "carts"), where("userId", "==", userId));
      // Add additional where clauses as needed
      q = query(q, where("id", "==", product.id));

      const querySnapshot = await getDocs(q);
      const existingProduct = querySnapshot?.docs[0];

      if (existingProduct) {
        // Update The Count
        const prevCount = existingProduct.data()?.count;
        const docRef = doc(db, "carts", existingProduct.id);
        const data = {
          ...product,
          userId: userId,
          count: prevCount ? prevCount + 1 : 1,
        };
        setDoc(docRef, data);
      } else {
        // Add nue product
        await addDoc(collection(db, "carts"), {
          userId: userId,
          count: 1,
          ...product,
        });
      }

      toast.success("Successfully Added To Cart.");
      navigate("/carts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <span>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
        <div className="product-price">${product.price}</div>
        <button onClick={addProductToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

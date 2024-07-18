import React from "react";
import "./OrderSummary.css";
import { useContextValue } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

const OrderSummary = ({ products }) => {
  const { userId } = useContextValue();
  const navigate = useNavigate();

  const totalAmount = products.reduce(
    (sum, product) => sum + product.price * product.count,
    0
  );

  const placeOrderHandeler = async () => {
    try {
      const selectedProducts = products.map((product) => {
        return {
          title: product.title,
          quantity: product.count,
          totalAmount: product.price * product.count,
          date: new Date(),
        };
      });

      // Add nue product
      await addDoc(collection(db, "orders"), {
        userId: userId,
        totalAmount: totalAmount,
        allProducts: selectedProducts,
      });

      // Making The Cart Empty After Order
      products.map(async (product) => {
        await deleteDoc(doc(db, "carts", product.itemId));
      });

      toast.success("Products Ordered Successfully.");
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <span className="product-name">{product.title}</span>
            <span className="product-count">x {product.count}</span>
            <span className="product-total">
              ${(product.price * product.count).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <span>Total: ${totalAmount.toFixed(2)}</span>
      </div>
      <button onClick={placeOrderHandeler} className="place-order-btn">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;

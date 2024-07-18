import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Spinner from "../components/Spinner";
import { useContextValue } from "../context/AuthProvider";
import "./styles/Home.css";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { userId } = useContextValue();

  const getOrders = async () => {
    try {
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const allOrders = querySnapshot?.docs?.map((doc) => {
        return { orderId: doc.id, ...doc.data() };
      });
      setOrders(allOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);
  return (
    <>
      {orders.length ? (
        <div className="order-container">
          {orders.map((order, index) => (
            <OrderTable key={index} order={order} />
          ))}
        </div>
      ) : (
        <h2 className="header-one">No Orders Placed...</h2>
      )}
      {/* Loader */}
      {loading && <Spinner loading={loading} />}
    </>
  );
};

export default Orders;

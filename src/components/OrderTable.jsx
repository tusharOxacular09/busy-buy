import React from "react";
import "./OrderTable.css";

const OrderTable = ({ order }) => {
  const { allProducts, orderId, totalAmount } = order;

  return (
    <div className="order-table-container">
      <h3>Order Id: {orderId}</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>${product.totalAmount.toFixed(2)}</td>
              <td>
                {new Date(product.date.seconds * 1000).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td colSpan="2">${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderTable;

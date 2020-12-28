import React from "react";

const PaymentInfo = ({ order }) => {
  return (
    <div className="text-left">
      <p>
        <strong>Order Id</strong> : {order.paymentIntent.id}
      </p>

      <p>
        <strong>Amount</strong>:{"  "}
        {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "CHF",
        })}
      </p>

      <p>
        <strong>Currency</strong>: {order.paymentIntent.currency.toUpperCase()}
      </p>

      <p>
        <strong>Method</strong>: {order.paymentIntent.payment_method_types[0]}
      </p>

      <p>
        <strong>Payment</strong>: {order.paymentIntent.status.toUpperCase()}
      </p>

      <p>
        <strong>Orderd</strong> on:{"  "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </p>

      <p className="badge bg-primary text-white">
        <strong>STATUS</strong>: {order.orderStatus}
      </p>
    </div>
  );
};

export default PaymentInfo;

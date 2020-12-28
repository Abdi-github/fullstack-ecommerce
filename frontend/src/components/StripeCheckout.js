import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../functions/stripe";

import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

const StripeCheckout = ({ history }) => {
  const user = useSelector((state) => state.user);
  const { token } = user;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const coupon = useSelector((state) => state.coupon);

  useEffect(() => {
    createPaymentIntent(coupon, token).then((res) => {
      console.log("create payment intent---------->", res.data);
      setClientSecret(res.data.clientSecret);

      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!success && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: ${totalAfterDiscount} CHF`}</p>
          ) : null}
        </div>
      )}

      <div className="text-center pb-5">
        <Card
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total:
              {cartTotal} CHF
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable :
              {(payable / 100).toFixed(2)} CHF
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || success}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        <p className={success ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
        {error && (
          <div className="card-error text-danger" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;

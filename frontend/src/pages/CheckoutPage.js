import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { emptyUserCart, getUserCart, saveUserAddress } from "../functions/user";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CheckoutPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  //   const [fullName, setFullName] = useState("");
  //   const [street, setStreet] = useState("");
  //   const [streetNo, setStreetNo] = useState("");
  //   const [city, setCity] = useState("");
  //   const [zip, setZip] = useState("");
  //   const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;

  useEffect(() => {
    getUserCart(token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(address, user.token)
      .then((res) => {
        console.log("ADDRESS RES", res);
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address saved");
        }
      })
      .catch((err) => console.log("cart save err", err));
    // const address = {
    //   fullName,
    //   street,
    // };
    // saveUserAddress(token, address).then((res) => {
    //   if (res.data.ok) {
    //     setAddressSaved(true);
    //     toast.success("Address saved");
    //   }
    // });
    // console.log(address);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        {/* 
        <form className="form col-9">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              className="form-control"
              type="text"
              id="fullName"
              //   placeholder="Enter full name"
              value={address.fullName}
              //   onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-9 pr-5">
                <label htmlFor="street">Street</label>
                <input
                  className="form-control"
                  type="text"
                  id="street"
                  //   placeholder="Enter address"
                  value={address.street}
                  //   onChange={(e) => setStreet(e.target.value)}
                  required
                ></input>
              </div>
              <div className="col-3">
                <label htmlFor="streetNo">Street No.</label>
                <input
                  className="form-control"
                  type="text"
                  id="streetNo"
                  //   placeholder="Enter address"
                  value={address.streetNo}
                  //   onChange={(e) => setStreetNo(e.target.value)}
                  //   required
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              className="form-control"
              type="text"
              id="city"
              //   placeholder="Enter city"
              value={address.city}
              //   onChange={(e) => setCity(e.target.value)}
              //   required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input
              className="form-control"
              type="text"
              id="zip"
              //   placeholder="Enter postal code"
              value={address.zip}
              //   onChange={(e) => setZip(e.target.value)}
              //   required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              className="form-control"
              type="text"
              id="country"
              //   placeholder="Enter country"
              value={address.country}
              //   onChange={(e) => setCountry(e.target.value)}
              //   required
            ></input>
          </div>
          <button
            className="btn btn-outline-primary btn-block mt-2"
            onClick={saveAddressToDb}
          >
            Save
          </button>
        </form>

         */}
        <br />
        <br />
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        {/* <h2>{total}</h2> */}
        {/* <h3>products</h3> */}
        {/* {JSON.stringify(products, null, 4)} */}
        <hr />
        <p>
          {" "}
          <strong>{products.length} products </strong>
        </p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count} CHF
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total} CHF</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={products.length === 0}
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

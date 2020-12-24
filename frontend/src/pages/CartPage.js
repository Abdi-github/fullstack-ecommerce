import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableInCheckout from "../components/ProductTableInCheckout";

const CartPage = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const { token } = user;
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCartItems = () => (
    <table className="table table-bordered text-center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price(CHF)</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Quantity</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductTableInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const saveOrderToDb = () => {
    //
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.price * c.count} CHF
              </p>
            </div>
          ))}
          <hr />
          Total: <strong>{getTotal()} CHF</strong>
          <hr />
          {token ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={saveOrderToDb}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

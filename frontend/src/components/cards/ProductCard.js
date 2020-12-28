import React, { useState } from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import { averageRating } from "../../functions/rating";
import defaultImage from "../../images/defaultImage.jpg";
import "./productCard.css";
import _ from "lodash";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [tooltipColor, setTooltipColor] = useState("#2db7f5");
  const [tooltipNoStock, setTooltipNoStock] = useState("Out of Stock");
  const [tooltipNoStockColor, setTooltipNoStockColor] = useState("#f50");

  const dispatch = useDispatch();

  // destructure
  const { images, title, description, price, slug } = product;
  const history = useHistory();
  const handleImageClick = (e) => {
    e.preventDefault();
    // console.log(history);
    history.push(`/product/${slug}`);
  };

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      // add tooltip
      setTooltip("Product added");
      setTooltipColor("#f50");

      // add to redux

      dispatch({
        type: "ADD_TO_CART",
        // payload: cart,
        payload: unique,
      });

      // SHOW DRAWER
      dispatch({
        type: "SET_VISIBILITY",
        payload: true,
      });
    }
  };

  return (
    <div className="sy">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{ height: "150px", objectFit: "cover", cursor: "pointer" }}
            className="p-1 img-hover-zoom img-hover-zoom--xyz"
            onClick={handleImageClick}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip} color={tooltipColor}>
            {product.quantity === 0 ? (
              <Tooltip title={tooltipNoStock} color={tooltipNoStockColor}>
                <div className="text-danger">Out of stock</div>
              </Tooltip>
            ) : (
              <Link onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </Link>
            )}
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
        <div className="lead pt-2 text-center font-weight-bold font-italic">
          <span>{price} CHF</span>
        </div>
      </Card>
      {product && product.ratings && product.ratings.length > 0 ? (
        averageRating(product)
      ) : (
        <div className="text-center pt-1 pb-3 text-muted">"No rating yet"</div>
      )}
    </div>
  );
};

export default ProductCard;

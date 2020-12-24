import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../images/defaultImage.jpg";
import ProductDetail from "./ProductDetails";
import ProductDetails from "./ProductDetails";

import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { averageRating } from "../../functions/rating";
import { useDispatch } from "react-redux";
import _ from "lodash";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, _id } = product;

  const { TabPane } = Tabs;

  const [tooltip, setTooltip] = useState("Click to add");
  const [tooltipColor, setTooltipColor] = useState("#2db7f5");

  const dispatch = useDispatch();

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
    }
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img key={i.public_id} src={i.url} alt={i.title} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={defaultImage}
                className="mb-3 card-image"
                alt="default"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h5 className="bg-info p-3">{title}</h5>

        {product && product.ratings && product.ratings.length > 0 ? (
          averageRating(product)
        ) : (
          <div className="text-center pt-1 pb-3 text-muted">
            "No rating yet"
          </div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip} color={tooltipColor}>
              <Link onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </Link>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          {/* <Meta title={title} description={description} /> */}

          <ProductDetails product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;

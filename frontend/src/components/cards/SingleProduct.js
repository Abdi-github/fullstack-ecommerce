import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../images/defaultImage.jpg";
import ProductDetail from "./ProductDetails";
import ProductDetails from "./ProductDetails";

import StarRating from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
import RatingModal from "../modals/RatingModal";

const SingleProduct = ({ product }) => {
  const { title, description, images, _id } = product;

  const { TabPane } = Tabs;

  const ratingChanged = (newRating, name) => {
    // console.log(newRating, name);
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

        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={2}
                changeRating={ratingChanged}
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

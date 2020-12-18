import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";
import {
  getRelatedProduct,
  getSingleProduct,
  starRating,
} from "../functions/product";

const SingleProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const { slug } = match.params;

  const [star, setStar] = useState(0);
  const user = useSelector((state) => state.user);
  const { token } = user;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  // To show current user's previous rating on this product once he clicked on rating button
  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy == user._id
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getSingleProduct(slug).then((res) => {
      setProduct(res.data);
      // load related product
      getRelatedProduct(res.data._id).then((res) =>
        setRelatedProduct(res.data)
      );
    });
  };
  const onStarClick = (newRating, name) => {
    // console.table(newRating, name);
    setStar(newRating);

    starRating(name, newRating, token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      {/* {JSON.stringify(product)} */}
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center py-4">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {relatedProduct.length ? (
          relatedProduct.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default SingleProductDetail;

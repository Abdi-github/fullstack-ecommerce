import React, { useEffect, useState } from "react";
import SingleProduct from "../components/cards/SingleProduct";
import { getSingleProduct } from "../functions/product";

const SingleProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getSingleProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      {JSON.stringify(product)}
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center py-4">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetail;

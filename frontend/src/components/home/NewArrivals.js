import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCardSkeleton from "../cards/LoadingCardSkeleton";
import ProductCard from "../cards/ProductCard";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container-fluid">
        {loading ? (
          <LoadingCardSkeleton count={4} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-3 mb-4  "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className=" col-md-3 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 4) * 12}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;

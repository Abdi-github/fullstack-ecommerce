import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loading from "../components/Loading";
import { getProductsByCount, getProductsByFilter } from "../functions/product";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  //  Load products by default on page load

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //  Load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      getProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
    // getProducts({ query: text });
  }, [text]);

  const getProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>

        <div className="col-md-9">
          {loading ? <Loading /> : <h4 className="text-danger">Products</h4>}

          {/* {products.length < 1 && <p>Products not available</p>} */}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

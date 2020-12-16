import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import { getProducts } from "../functions/product";
import Loading from "../components/Loading";
import Jumbotron from "../components/Jumbotron";
import LoadingCardSkeleton from "../components/cards/LoadingCardSkeleton";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      {/* {JSON.stringify(products)} */}
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <br />
      <br />
    </>
  );
};

export default HomePage;

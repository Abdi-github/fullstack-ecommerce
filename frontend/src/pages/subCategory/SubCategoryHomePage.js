import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import Loading from "../../components/Loading";
import { getSingleSubCategory } from "../../functions/subCategory";

const SubCategoryHomePage = ({ match }) => {
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSingleSubCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));

      setSubCategory(res.data.subCategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <Loading />
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{subCategory.name}" sub-category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryHomePage;

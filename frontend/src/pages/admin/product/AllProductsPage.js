import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import Loading from "../../../components/Loading";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const { token } = user;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(50)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Are you sure you want to delete it?");
    if (answer) {
      // console.log("send delete request ------", slug);
      removeProduct(slug, token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted.`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-10">
          <ToastContainer />
          {loading ? <Loading /> : <h4>Products</h4>}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-3" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

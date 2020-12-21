import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSubCategories } from "../../functions/subCategory";
import Loading from "../Loading";

const SubCategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  const renderCategories = () =>
    subCategories.map((sc) => (
      <div
        key={sc._id}
        className="col-md-2 btn btn-outlined-primary btn-lg btn-block btn-raised m-2"
      >
        <Link to={`/subcategory/${sc.slug}`}>{sc.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">{loading ? <Loading /> : renderCategories()}</div>
    </div>
  );
};

export default SubCategoryList;

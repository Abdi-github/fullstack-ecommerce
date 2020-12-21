import { Menu } from "antd";
import Item from "antd/lib/list/Item";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../functions/category";

import Loading from "../Loading";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const renderCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col-md-2 btn btn-outlined-primary btn-lg btn-block btn-raised m-2"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">{loading ? <Loading /> : renderCategories()}</div>
    </div>
  );
};

export default CategoryList;

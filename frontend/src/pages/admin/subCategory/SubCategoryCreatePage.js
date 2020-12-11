import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading";
import AdminNav from "../../../components/nav/AdminNav";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryInputForm from "../../../components/Input-forms/CategoryInputForm";
import SearchInput from "../../../components/Input-forms/SearchInput";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
} from "../../../functions/subCategory";
import { getAllCategories } from "../../../functions/category";

const SubCategoryCreatePage = () => {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  // Search
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    return getAllCategories().then((c) => setCategories(c.data));
  };

  const loadSubCategories = () => {
    return getAllSubCategories().then((sub) => setSubCategories(sub.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSubCategory({ name, parent: category }, token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const deleteHandler = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure to delete it?")) {
      setLoading(true);
      deleteSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubCategories();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <ToastContainer />
          {loading ? <Loading /> : <h4>Create sub-category</h4>}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* {JSON.stringify(category)} */}

          <CategoryInputForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          <SearchInput keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {/* {JSON.stringify(categories)} */}

          {subCategories.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-secondary" key={sub._id}>
              {sub.name}
              <span
                onClick={() => deleteHandler(sub.slug)}
                className="btn btn-md float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subCategory/${sub.slug}`}>
                <span className="btn btn-md float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreatePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryInputForm from "../../../components/Input-forms/CategoryInputForm";
import SearchInput from "../../../components/Input-forms/SearchInput";

const CategoryCreate = () => {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Search
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getAllCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
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
      deleteCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
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
          {loading ? <Loading /> : <h4>Create category</h4>}

          <CategoryInputForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          <SearchInput keyword={keyword} setKeyword={setKeyword} />

          <hr />
          {/* {JSON.stringify(categories)} */}

          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => deleteHandler(c.slug)}
                className="btn btn-md float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;

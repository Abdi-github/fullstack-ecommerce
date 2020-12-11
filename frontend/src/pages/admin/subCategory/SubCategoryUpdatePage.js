import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../functions/category";
import Loading from "../../../components/Loading";
import CategoryInputForm from "../../../components/Input-forms/CategoryInputForm";
import {
  getSingleSubCategory,
  updateSubCategory,
} from "../../../functions/subCategory";

const SubCategoryUpdatePage = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () => {
    return getAllCategories().then((c) => setCategories(c.data));
  };

  const loadSubCategory = () => {
    return getSingleSubCategory(match.params.slug).then((sub) => {
      setName(sub.data.name);
      setParent(sub.data.parent);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSubCategory(match.params.slug, { name, parent }, token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/subCategory");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

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
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
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

          <hr />
          {/* {JSON.stringify(categories)} */}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdatePage;

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCategories, updateCategory } from "../../../functions/category";
import Loading from "../../../components/Loading";
import CategoryInputForm from "../../../components/Input-forms/CategoryInputForm";

const CategoryUpdatePage = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getAllCategories(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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
          {loading ? <Loading /> : <h4>Update category</h4>}

          <CategoryInputForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdatePage;

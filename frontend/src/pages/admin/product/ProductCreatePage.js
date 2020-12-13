import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../functions/product";

import { Select } from "antd";

import {
  getAllCategories,
  getSubCategories,
} from "../../../functions/category";

const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const { Option } = Select;

const ProductCreatePage = () => {
  const [values, setValues] = useState(initialState);
  const user = useSelector((state) => state.user);
  const { token } = user;

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const {
    title,
    description,
    price,
    categories,
    category,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getAllCategories().then((c) =>
      setValues({ ...values, categories: c.data })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 400) toast.error(error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subCategories: [], category: e.target.value });
    getSubCategories(e.target.value).then((res) => {
      console.log("SUBCATEGORY OPTIONS ON CATGORY CLICK", res);
      setSubCategoryOptions(res.data);
    });
    setShowSubCategories(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <ToastContainer />
          <h4>Create product</h4>
          <hr />

          {/* {JSON.stringify(values)} */}
          {/* {JSON.stringify(values.categories)} */}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleCatagoryChange}
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

            {/* {subCategoryOptions ? subCategoryOptions.length : "no subs"} */}
            {showSubCategories && (
              <div>
                <label>Sub Categories</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={subCategories}
                  onChange={(value) =>
                    setValues({ ...values, subCategories: value })
                  }
                >
                  {subCategoryOptions.length &&
                    subCategoryOptions.map((s) => (
                      <Option key={s._id} value={s._id}>
                        {s.name}
                      </Option>
                    ))}
                </Select>
              </div>
            )}
            <button className="btn btn-outline-info btn-block">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;

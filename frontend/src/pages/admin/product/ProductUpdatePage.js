import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import ProductUpdateForm from "../../../components/Input-forms/ProductUpdateForm";
import {
  getAllCategories,
  getSubCategories,
} from "../../../functions/category";
import FileUpload from "../../../components/Input-forms/FileUpload";
import Loading from "../../../components/Loading";
import { toast, ToastContainer } from "react-toastify";

const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdatePage = ({ match, history }) => {
  const { slug } = match.params;

  const [values, setValues] = useState(initialState);

  const user = useSelector((state) => state.user);
  const { token } = user;
  const [categories, setCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getSingleProduct(slug).then((p) => {
      //   console.log("Single product----", p);

      setValues({ ...values, ...p.data });

      // 2 load single product subCategories
      getSubCategories(p.data.category._id).then((res) => {
        setSubCategoryOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub category ids to show as default sub values in antd Select
      let arr = [];
      p.data.subCategories.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for ant design select to work
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const loadCategories = () => {
    return getAllCategories().then((c) => setCategories(c.data));
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subCategories: [] });

    setSelectedCategory(e.target.value);

    getSubCategories(e.target.value).then((res) => {
      console.log("SUBCATEGORY OPTIONS ON CATGORY CLICK", res);
      setSubCategoryOptions(res.data);
    });

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-10">
          {loading ? <Loading /> : <h4>Update product</h4>}
          <ToastContainer />
          {/* {JSON.stringify(props.match.params.slug)} */}
          {/* {JSON.stringify(match.params.slug)} */}
          {/* {JSON.stringify(slug)} */}
          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            categories={categories}
            subCategoryOptions={subCategoryOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdatePage;

import { Menu, Radio, Slider } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/Input-forms/Star";
import Loading from "../components/Loading";
import { getAllCategories } from "../functions/category";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getAllSubCategories } from "../functions/subCategory";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [price, setPrice] = useState([0, 0]);

  const [reqOk, setReqOk] = useState(false);

  const [star, setStar] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");

  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");

  const [shipping, setShipping] = useState("");

  const search = useSelector((state) => state.search);
  const { text } = search;

  const dispatch = useDispatch();

  //  Load products by default on page load

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
    loadAllSubCategories();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const loadAllCategories = () => {
    getAllCategories().then((res) => setCategories(res.data));
  };
  // Get products by different filter methods
  const getProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  //  Load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      getProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
    // getProducts({ query: text });
  }, [text]);

  //  Load products by category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          value={c._id}
          name="category"
          className="px-2 pb-2"
          onChange={handleCheck}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  // handle check for categories checkbox

  const handleCheck = (e) => {
    // console.log(e.target.value);

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setPrice([0, 0]);
    setStar("");
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    getProducts({ category: inTheState });
  };

  //  Load products by price range

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setCategoryIds([]);
    setStar("");
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");

    setPrice(value);

    // To delay the request to backend
    setTimeout(() => {
      setReqOk(!reqOk);
    }, 300);
  };

  useEffect(() => {
    console.log("Ok to send request ");
    getProducts({ price: price });
  }, [reqOk]);

  // Load products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Reseting
    setPrice([0, 0]);
    setCategoryIds([]);
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");

    setStar(num);

    getProducts({ stars: num });
  };

  const showStars = () => (
    <div className="px-2 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  //  show products by sub-category

  const loadAllSubCategories = () => {
    getAllSubCategories().then((res) => setSubCategories(res.data));
  };

  const showSubCategories = () =>
    subCategories.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSubCategory(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSubCategory = (subCategory) => {
    // console.log("SUB-CATEGORY", subCategory);
    setSubCategory(subCategory);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");

    getProducts({ subCategory: subCategory });
  };

  // show products based on brand name

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSubCategory("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);

    getProducts({ brand: e.target.value });
  };

  // show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSubCategory("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");

    setColor(e.target.value);

    getProducts({ color: e.target.value });
  };

  // show products based on shipping status yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSubCategory("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // Resetting
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");

    setShipping(e.target.value);

    getProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={["category", "price"]}>
            <Menu.SubMenu
              key="category"
              title={<span className="h6">Category</span>}
            >
              <div>
                {/* {JSON.stringify(categories)} */}
                {showCategories()}
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu key="price" title={<span className="h6">Price</span>}>
              <div>
                <Slider
                  className="mx-3"
                  range
                  max="3999"
                  value={price}
                  onChange={handleSlider}
                  tipFormatter={(v) => `${v} CHF`}
                />
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="stars"
              title={<span className="h6">Ratings</span>}
            >
              <div>{showStars()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="stars"
              title={<span className="h6">Sub-Category</span>}
            >
              <div>{showSubCategories()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="brands"
              title={<span className="h6">Brands</span>}
            >
              <div className="pr-5">{showBrands()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="colors"
              title={<span className="h6">Colors</span>}
            >
              <div className="pr-5">{showColors()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="shipping"
              title={<span className="h6">Shipping </span>}
            >
              <div className="pr-5">{showShipping()}</div>
            </Menu.SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? <Loading /> : <h4 className="text-danger">Products</h4>}

          {products.length < 1 && <p>Products not available</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

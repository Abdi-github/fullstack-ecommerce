import { Menu, Slider } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Loading from "../components/Loading";
import { getAllCategories } from "../functions/category";
import { getProductsByCount, getProductsByFilter } from "../functions/product";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [price, setPrice] = useState([0, 0]);

  const [reqOk, setReqOk] = useState(false);

  const search = useSelector((state) => state.search);
  const { text } = search;

  const dispatch = useDispatch();

  //  Load products by default on page load

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
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
    setPrice([0, 0]);

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
    setCategoryIds([]);

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

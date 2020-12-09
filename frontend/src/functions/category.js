import axios from "axios";

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};
export const getSingleCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const createCategory = async (category, usertoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      usertoken,
    },
  });
};

export const deleteCategory = async (slug, usertoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      usertoken,
    },
  });
};
export const updateCategory = async (slug, category, usertoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      usertoken,
    },
  });
};

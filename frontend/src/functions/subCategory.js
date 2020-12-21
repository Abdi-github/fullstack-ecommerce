import axios from "axios";

export const getAllSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subcategories`);
};
export const getSingleSubCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/subCategory/${slug}`);
};

export const createSubCategory = async (subCategory, usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/subCategory`,
    subCategory,
    {
      headers: {
        usertoken,
      },
    }
  );
};

export const deleteSubCategory = async (slug, usertoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/subCategory/${slug}`,
    {
      headers: {
        usertoken,
      },
    }
  );
};
export const updateSubCategory = async (slug, subCategory, usertoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/subCategory/${slug}`,
    subCategory,
    {
      headers: {
        usertoken,
      },
    }
  );
};

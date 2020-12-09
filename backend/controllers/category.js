import Category from "../models/category";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};
export const getAll = (req, res) => {
  //
};
export const getSingle = (req, res) => {
  //
};
export const update = (req, res) => {
  //
};
export const remove = (req, res) => {
  //
};

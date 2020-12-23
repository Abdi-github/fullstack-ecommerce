import Category from "../models/category";
import slugify from "slugify";
import SubCategory from "../models/subCategory";
import Product from "../models/product";

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
export const getAll = async (req, res) => {
  const category = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(category);
};
export const getSingle = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};
export const update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);

    res.status(400).send("Category update failed");
  }
};
export const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    console.log(error);

    res.status(400).send("Category delete failed");
  }
};

export const getSubCategories = (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((error, subCategories) => {
    if (error) console.log(error);
    res.json(subCategories);
  });
};

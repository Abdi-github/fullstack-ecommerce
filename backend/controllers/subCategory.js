import Category from "../models/category";
import slugify from "slugify";
import SubCategory from "../models/subCategory";
import Product from "../models/product";

export const create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new SubCategory({
      name: name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create sub-category failed");
  }
};
export const getAll = async (req, res) => {
  const subCategories = await SubCategory.find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(subCategories);
};

export const getSingle = async (req, res) => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();

  // res.json(subCategory);

  const products = await Product.find({ subCategories: subCategory._id })
    .populate("category")
    .exec();

  res.json({
    subCategory,
    products,
  });
};

export const update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent: parent, slug: slugify(name) },
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
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (error) {
    console.log(error);

    res.status(400).send("Category delete failed");
  }
};

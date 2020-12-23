import slugify from "slugify";
import Product from "../models/product";
import SubCategory from "../models/subCategory";
import User from "../models/user";

export const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subCategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

export const remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategories")
    .exec();
  res.json(product);
};

export const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    console.log("PRODUCT UPDATE ERROR ----> ", error);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

// ------------- WITHOUT PAGINATION ------------ //

/*
export const list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
*/

// ------------- WITH PAGINATION ------------ //

export const list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const totalProductsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

// Product Rating

export const productRating = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

export const getRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};

//---------------- SEARCH AND FILTER----------------------

// Filter by text

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

// Filter by Price

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

// Filter by category

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

// Filter by rating/star

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        // title: "$title",
        // description:"$description",
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subCategories", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

// Filter by sub-category

const handleSubCategory = async (req, res, subCategory) => {
  const products = await Product.find({ subCategories: subCategory })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

// Filter by brand

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

// Filter by color

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

// Filter by shipping status

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

export const searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    subCategory,
    brand,
    color,
    shipping,
  } = req.body;

  // filter by text

  if (query) {
    console.log("query--->", query);
    await handleQuery(req, res, query);
  }

  // filter by price

  if (price !== undefined) {
    console.log("price ---> ", price);
    await handlePrice(req, res, price);
  }

  // filter by category

  if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }

  // filter by ratings

  if (stars) {
    console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }

  // filter by sub-category

  if (subCategory) {
    console.log("sub-category ---> ", subCategory);
    await handleSubCategory(req, res, subCategory);
  }

  // filter by brands

  if (brand) {
    console.log("brand ---> ", brand);
    await handleBrand(req, res, brand);
  }

  // filter by color

  if (color) {
    console.log("color ---> ", color);
    await handleColor(req, res, color);
  }

  // filter by shipping

  if (shipping) {
    console.log("shipping ---> ", shipping);
    await handleShipping(req, res, shipping);
  }
};

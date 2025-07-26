const db = require("../db/categoryQueries");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render("index", { title: "Home", categories });
  } catch (err) {
    console.log("Error retrieving categories: ", err);
    res.status(500).send("Server error");
  }
};

exports.createCategory = (req, res) => {
  res.send("This will create a new category");
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("Invalid category ID");

  try {
    const category = await db.getCategoryById(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    // console.log(category);
    res.render("category", { category, items: category.items || [] });
  } catch (err) {
    console.log("Error getting category: ", err);
    res.status(500).send("Server error");
  }
};

exports.updateCategory = (req, res) => {
  res.send("This will update the category");
};

exports.deleteCategory = (req, res) => {
  res.send("This will delete the category");
};

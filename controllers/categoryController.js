const db = require("../db/categoryQueries");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render("index", { title: "Home", categories });
  } catch (err) {
    console.error("Error retrieving categories: ", err);
    res.status(500).send("Server error");
  }
};

exports.renderNewCategoryForm = (req, res) => {
  res.render("newCategory");
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).send("Category name is required");
  }

  try {
    await db.createCategory(name);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating category: ", err);
    res.status(500).send("Server error");
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("Invalid category ID");

  try {
    const category = await db.getCategoryById(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("category", { category, items: category.items || [] });
  } catch (err) {
    console.log("Error getting category: ", err);
    res.status(500).send("Server error");
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Category name is required");
  }

  try {
    const updated = await db.updateCategory(id, name);
    if (!updated) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Updated");
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.deleteCategory(id);
    if (!deleted) {
      return res.status(404).send("Cannot delete category");
    }
    res.status(200).send("Deleted");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Server error");
  }
};

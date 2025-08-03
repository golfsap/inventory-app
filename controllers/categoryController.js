const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const db = require("../db/categoryQueries");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render("allCategories", { categories });
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
    const newCategory = await db.createCategory(name);
    if (!newCategory) {
      return res.status(500).send("Category creation failed");
    }
    res.redirect(`/categories/${newCategory.id}`);
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
  const { name, adminPassword } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Category name is required");
  }
  if (adminPassword !== ADMIN_PASSWORD) {
    return res.status(403).send("Invalid admin password");
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
  const { adminPassword } = req.body;

  if (adminPassword !== ADMIN_PASSWORD) {
    return res.status(403).send("Invalid admin password");
  }
  if (isNaN(id)) return res.status(400).send("Invalid category ID");

  try {
    const category = await db.getCategoryById(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    const itemsInCategory = category.items;
    if (itemsInCategory.length > 0) {
      return res
        .status(400)
        .send("This category still has items. Reassign or delete them first.");
    }

    const deleted = await db.deleteCategory(id);
    if (!deleted) {
      return res.status(404).send("Cannot delete category");
    }
    res.status(200).send("Deleted");
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).send("Server error");
  }
};

const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

// Create new category
categoryRouter.post("/", categoryController.createCategory);

// Get all categories
categoryRouter.get("/", categoryController.getAllCategories);

// Show new category form
categoryRouter.get("/new", categoryController.renderNewCategoryForm);

// Get a siingle category by ID
categoryRouter.get("/:id", categoryController.getCategoryById);

// Update a category
categoryRouter.put("/:id", categoryController.updateCategory);

// Delete a category
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;

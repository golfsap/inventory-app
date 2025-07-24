const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.put("/", categoryController.updateCategory);
categoryRouter.delete("/", categoryController.deleteCategory);

module.exports = categoryRouter;

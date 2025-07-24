const { Router } = require("express");
const indexRouter = Router();
const categoryController = require("../controllers/categoryController");

indexRouter.get("/", categoryController.getAllCategories);

const categoryRoutes = require("./categories");
const itemRoutes = require("./items");

indexRouter.use("/categories", categoryRoutes);
indexRouter.use("/items", itemRoutes);

module.exports = indexRouter;

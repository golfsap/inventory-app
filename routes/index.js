const { Router } = require("express");
const indexRouter = Router();
const homeController = require("../controllers/homeController");

indexRouter.get("/", homeController.homePage);

const categoryRoutes = require("./categories");
const itemRoutes = require("./items");

indexRouter.use("/categories", categoryRoutes);
indexRouter.use("/items", itemRoutes);

module.exports = indexRouter;

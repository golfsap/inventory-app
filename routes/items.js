const { Router } = require("express");
const itemRouter = Router();
const itemController = require("../controllers/itemController");

itemRouter.get("/", itemController.getAllItems);

module.exports = itemRouter;

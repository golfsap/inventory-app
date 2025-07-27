const { Router } = require("express");
const itemRouter = Router();
const itemController = require("../controllers/itemController");

// Get all items
itemRouter.get("/", itemController.getAllItems);

// Get a single item by ID
itemRouter.get("/:id", itemController.getItemById);

// Create a new item
itemRouter.post("/", itemController.createItem);

module.exports = itemRouter;

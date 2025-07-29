const { Router } = require("express");
const itemRouter = Router();
const itemController = require("../controllers/itemController");

// Get all items
itemRouter.get("/", itemController.getAllItems);

// Get a single item by ID
itemRouter.get("/:id", itemController.getItemById);

// Create a new item
itemRouter.post("/", itemController.createItem);

// Show edit form
itemRouter.get("/:id/edit", itemController.showEditForm);

// Handle edit form (update item)
itemRouter.post("/:id/update", itemController.updateItem);

module.exports = itemRouter;

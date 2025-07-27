const db = require("../db/itemQueries");

exports.getAllItems = async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.render("allItems", { title: "All Items", items });
  } catch (err) {
    console.error("Error retrieving items: ", err);
    res.status(500).send("Server error");
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("Invalid item ID");

  try {
    const item = await db.getItemById(id);
    if (!item) {
      return res.status(400).send("Item not found");
    }
    res.render("item", { item });
  } catch (err) {
    console.error("Error getting item: ", err);
    res.status(500).send("Server error");
  }
};

function sanitizeNumber(value) {
  return value === "" || value === undefined ? null : Number(value);
}

exports.createItem = async (req, res) => {
  const { name, brand, size, price, quantity_in_stock, category_id } = req.body;

  if (!name || !category_id) {
    return res.status(400).send("Name and category are required.");
  }

  const priceValue = sanitizeNumber(price);
  const quantityValue = sanitizeNumber(quantity_in_stock);
  try {
    const result = await db.addItem({
      name,
      brand,
      size,
      price: priceValue,
      quantity_in_stock: quantityValue,
      category_id,
    });
    if (result.rowCount === 0) {
      return res.status(404).send("Could not add item");
    }
    res.status(201).send("Item created");
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).send("Server error");
  }
};

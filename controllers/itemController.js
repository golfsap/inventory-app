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

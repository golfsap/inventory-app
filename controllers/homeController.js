const itemDb = require("../db/itemQueries");
const categoryDb = require("../db/categoryQueries");

exports.homePage = async (req, res) => {
  try {
    const categories = await categoryDb.getAllCategories();
    const items = await itemDb.getAllItems();
    const lowStock = items.filter((item) => item.quantity_in_stock < 5);
    res.render("index", {
      title: "Home",
      categories,
      items,
      lowStockItems: lowStock,
    });
  } catch (err) {
    console.error("Error loading homepage:", err);
    res.status(500).send("Server error");
  }
};

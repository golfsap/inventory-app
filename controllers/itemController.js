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

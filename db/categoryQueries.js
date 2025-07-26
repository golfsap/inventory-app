const pool = require("./pool");

async function getAllCategories() {
  const result = await pool.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
}

async function getCategoryById(id) {
  const categoryResult = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );
  if (categoryResult.rows.length === 0) {
    return null;
  }
  const itemsResult = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [id]
  );
  const category = categoryResult.rows[0];
  category.items = itemsResult.rows;
  return category;
}

module.exports = {
  getAllCategories,
  getCategoryById,
};

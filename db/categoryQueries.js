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

async function createCategory(name) {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING id",
    [name]
  );
  return result.rows[0];
}

async function updateCategory(id, name) {
  const result = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

async function deleteCategory(id) {
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

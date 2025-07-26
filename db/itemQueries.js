const pool = require("./pool");

async function getAllItems() {
  const result = await pool.query(
    "SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id =  categories.id;"
  );
  return result.rows;
}

async function getItemById(id) {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  getAllItems,
  getItemById,
};

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

async function addItem({
  name,
  brand,
  size,
  price,
  quantity_in_stock,
  category_id,
}) {
  const result = await pool.query(
    "INSERT INTO items (name, brand, size, price, quantity_in_stock, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, brand, size, price, quantity_in_stock, category_id]
  );
  return result;
}

module.exports = {
  getAllItems,
  getItemById,
  addItem,
};

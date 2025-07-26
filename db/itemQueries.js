const pool = require("./pool");

async function getAllItems() {
  const result = await pool.query(
    "SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id =  categories.id;"
  );
  return result.rows;
}

module.exports = {
  getAllItems,
};

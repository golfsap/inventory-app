exports.getAllCategories = (req, res) => {
  res.render("index", { title: "Home", categories });
};

exports.createCategory = (req, res) => {
  res.send("This will create a new category");
};

exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  res.render("category", { category, items: category.Items });
};

exports.updateCategory = (req, res) => {
  res.send("This will update the category");
};

exports.deleteCategory = (req, res) => {
  res.send("This will delete the category");
};

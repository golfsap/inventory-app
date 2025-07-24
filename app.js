const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add if sending JSON bodies

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

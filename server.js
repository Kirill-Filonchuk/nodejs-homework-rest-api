const mongoose = require("mongoose");
require("dotenv").config();
const { PORT, DB_HOST } = process.env;
const app = require("./app");

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT || 3000))
  .then(() => console.log(`Database connection successful: ${PORT}`))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

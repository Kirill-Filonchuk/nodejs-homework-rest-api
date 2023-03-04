const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const { PORT, DB_HOST, UPLOADS_DIR, DB_HOST_TEST } = process.env;
const uploadDir = path.join(process.cwd(), UPLOADS_DIR); // temp
// const storeImage = path.join(process.cwd(), STORE_DIR); // publick

console.log(process.cwd() === __dirname, PORT);

console.log(uploadDir);
const app = require("./app");

const isPresent = (pathDir) => {
  return fs
    .access(pathDir)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotPresent = async (folder) => {
  if (!(await isPresent(folder))) {
    await fs.mkdir(folder);
  }
};

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT || 3000, async () => {
      createFolderIfNotPresent(UPLOADS_DIR);
      // createFolderIfNotPresent(STORE_DIR);
    })
  )
  .then(() => console.log(`Database connection successful: ${PORT}`))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

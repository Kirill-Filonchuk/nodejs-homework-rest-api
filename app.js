const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
// импортируется группа роутов - в отдельный файл

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
// группа роуто применяется после того как прошло через мидлВары. И, любой маршрут, который начинается с "/api/contacts" будет этим роутом обрабатываться.

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
//  эта ипоследующая мидлВара работают, когда обработчик НЕ нашел совпадение по маршруту или возникла ОШИБКА - она перехватывается следующей мидлВарой
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app; // сервер экспортируется, а импорт его в файле server.js

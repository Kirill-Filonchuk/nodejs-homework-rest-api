/*
Извлукает токен из заголовка и:
1. Проверяет валидность токена (т.е., что мы его выдали и он не истек)
2. Извлекает из токена id, находит пользователя в БД по id и прикрепляет его к запросу (req.user)
---
 1. Извлечь из заголовков запроса содержимое заголовка authorization
 2. Разделить его на два - Бирер и Токен
 3. Проверить равно ли первое слово Бирер
 4, Проверить валидность второго слова - Токен через JWT verify
 5/ Если валиден, извечь из него ИД пользователя, и найти его в БД
 6. Если мы нашли с таким ИД, то токен нужно прикрепить к заголовку запроса - (объект req)! REQ - один у всех
*/
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw HttpError(401, "Unauthorized. Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!(token === user.token)) {
      throw HttpError(401, "ATENTION!! Replacement TOKEN");
    }

    if (!user || !user.token) {
      // || !user.token - когда пользователь разлогинился его token=null
      throw HttpError(401, "Unauthorized. Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authenticate;

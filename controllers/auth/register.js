// const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, subscription = "starter", password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Conflict. Email in use");
  }

  // Используем модель, как функцию-конструктор/ т.е С помощью модели создаюю объект (экземпляр), который я хочу сохранить в БД
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save(); // сохраняю в БД
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const newUser = await User.create({
  //     email,
  //     subscription,
  //     password: hashPassword,
  //   });
  res.status(201).json({
    status: "success",
    code: 201,
    ResponseBody: {
      user: {
        email: newUser.email,
        subscription,
        password: newUser.password,
      },
    },
  });
};

module.exports = register;

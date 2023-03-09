// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, subscription = "starter", password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Conflict. Email in use");
  }

  const optionsGravatar = {
    size: 250,
    d: "identicon",
  };
  const avatarURL = gravatar.url(email, optionsGravatar);

  //Создание верификации
  const verificationToken = nanoid();

  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<h1>If it was you, her link to confirm you registration </h1><a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Please, open it</a>`,
  };

  await sendEmail(verifyEmail);
  // Используем модель, как функцию-конструктор/ т.е С помощью модели создаюю объект (экземпляр), который я хочу сохранить в БД
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
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
        avatarURL,
      },
    },
  });
};

module.exports = register;

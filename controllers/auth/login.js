// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw HttpError(401, "Unauthorized. Email or password is wrong");
  }

  //   if (!user) {
  //     throw HttpError(401, "Unauthorized. Email or password is wrong");
  //   }
  //     const passwordCompare = bcrypt.compareSync(password, user.password);
  //     if (!passwordCompare) {
  //         throw HttpError(401, "Unauthorized. Email or password is wrong");
  //     }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    Status: 200,
    ResponseBody: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;

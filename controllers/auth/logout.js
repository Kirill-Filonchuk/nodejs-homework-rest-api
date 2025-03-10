const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log((_id, "user LogOut"));
  await User.findByIdAndUpdate(_id, { token: null }, { new: true });

  res.status(204).json();
};

module.exports = logout;

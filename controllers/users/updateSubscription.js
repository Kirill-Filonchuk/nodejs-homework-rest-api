const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(_id, subscription, "_id current User");
  const result = await User.findByIdAndUpdate(
    _id,
    {
      subscription: subscription,
    },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  //   const body={ email, subscription: subscription };
  //   console.log({ email, subscription });
  res.status(201).json({
    status: 201,
    message: "Created",
    ResponseBody: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = updateSubscription;

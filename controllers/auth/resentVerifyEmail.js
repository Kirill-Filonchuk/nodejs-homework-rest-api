const { User } = require("../../models/user");
const { sendEmail, HttpError } = require("../../helpers");
const { BASE_URL } = process.env;

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // const {email}=user
  console.log(user, "user in resend");
  if (!user || user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const repeatedVerifyEmail = {
    to: email,
    subject: "Repeated verify you email",
    html: `<h1>You get this mail, because you ordered re-verifacation.  Her link to repeated confirm you registration </h1><a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Please, open it</a>`,
  };
  await sendEmail(repeatedVerifyEmail);

  res.json({
    ResponseBody: {
      message: "Verification email sent",
    },
  });
};

module.exports = resentVerifyEmail;

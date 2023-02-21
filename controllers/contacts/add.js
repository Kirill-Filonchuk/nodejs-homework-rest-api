const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const add = async (req, res, next) => {
  const { _id } = req.user; // благодаря миддлваре authenticate
  const { email } = req.body;
  const checkUnicByEmail = await Contact.find({
    $and: [{ email: email }, { owner: _id }],
  });
  console.log(checkUnicByEmail, "checkUnicByEmail");
  if (checkUnicByEmail.length > 0) {
    throw HttpError(409, "Conflict. Current user has this Contact yet");
  }
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = add;

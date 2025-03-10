const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  // const result = await Contact.findByIdAndRemove(contactId);
  const result = await Contact.findOneAndRemove({
    $and: [{ _id: contactId }, { owner: _id }],
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, `The contact by id=${contactId} is not present`);
  }
  res.status(200).json(result);
};

module.exports = removeById;

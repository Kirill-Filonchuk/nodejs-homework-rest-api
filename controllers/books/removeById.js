const contactsOper = require("../../models");
const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOper.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `The contact by id=${contactId} is not present`);
  }
  res.status(200).json(result);
};

module.exports = removeById;

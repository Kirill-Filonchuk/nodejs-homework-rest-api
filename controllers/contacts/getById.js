const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `The contact by id=${contactId} is not present`);
  }
  res.json(result);
};

module.exports = getById;

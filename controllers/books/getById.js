const contactsOper = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOper.getContactById(contactId);
  // if (!result.length) { //when we use filter method in contactsOper.getContactById
  if (!result) {
    throw HttpError(404, `The contact by id=${contactId} is not present`);
  }
  res.json(result);
};

module.exports = getById;

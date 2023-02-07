const HttpError = require("../../helpers");
const contactsOper = require("../../models");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOper.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateById;

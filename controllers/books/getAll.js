const contactsOper = require("../../models");

const getAll = async (req, res, next) => {
  const result = await contactsOper.listContacts();
  res.json(result);
};

module.exports = getAll;

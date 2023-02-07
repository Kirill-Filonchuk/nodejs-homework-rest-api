const contactsOper = require("../../models");

const add = async (req, res, next) => {
  const result = await contactsOper.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;

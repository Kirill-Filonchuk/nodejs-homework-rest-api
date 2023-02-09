const { HttpError } = require("../helpers");

const isEmpty = (req, res, next) => {
  //   const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  next();
};

module.exports = isEmpty;

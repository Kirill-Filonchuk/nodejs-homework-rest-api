const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  console.log(_id);
  const result = await Contact.find({
    $and: [{ _id: contactId }, { owner: _id }],
  }).populate({
    path: "owner",
    select: "-_id subscription email",
  });
  console.log(result);
  // const result = await Contact.findById(contactId).populate({
  //   path: "owner",
  //   select: "-_id subscription email",
  // });
  if (!result || result.length === 0) {
    throw HttpError(404, `The contact by id=${contactId} is not present`);
  }
  res.json(result);
};

module.exports = getById;

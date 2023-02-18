const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  console.log(req.user, "req.user");
  console.log(req.query, "req.query");
  const { page = 1, limit = 4, favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id, favorite: favorite }, "", {
    skip: skip,
    limit: Number(limit),
  }).populate({
    path: "owner",
    select: "-_id subscription email",
  });
  res.json(result);
};

module.exports = getAll;

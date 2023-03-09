const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  // console.log(req.user, "req.user");
  // console.log(req.query, "req.query");
  // const { page = 1, limit = 4, favorite = true } = req.query;
  const { _id: owner } = req.user;
  const { page = 1, limit = 4, favorite } = req.query;
  const query = { owner };
  // Без задания значения favorite - показываю любые контакты пользователя
  query.favorite = favorite ? favorite : { $in: [true, false] };
  const skip = (page - 1) * limit;
  // { owner: _id, favorite: favorite },
  const result = await Contact.find(query, "", {
    skip: skip,
    limit: Number(limit),
  }).populate({
    path: "owner",
    select: "-_id subscription email",
  });
  res.json(result);
};

module.exports = getAll;

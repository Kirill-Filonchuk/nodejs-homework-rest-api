const ctrlWraper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWraper;

// async (req, res, next) => {
//   try {
//     const contacts = await listContacts();
//     res.json(contacts);
//     // res.json({
//     //   status: "success",
//     //   code: 200,
//     //   data: {
//     //     result: contacts,
//     //   },
//     // });
//   } catch (error) {
//     next(error);
//   }
// });

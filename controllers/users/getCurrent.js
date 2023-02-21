// const {User}=require("../../models/user")
// Должны взять инфу о текущем пользователе - тот, кто спрашивает - нам нужет персонализированный ответ
//   const { authorization } = req.headers;
//   console.log(authorization, "Hello");
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    ResponseBody: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;

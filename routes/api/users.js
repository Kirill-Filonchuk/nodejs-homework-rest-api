const express = require("express");
const router = express.Router();
const { auth: ctrl, users } = require("../../controllers");
const {
  joiRegisterSchema,
  joiRepeatedSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  authenticate,
  upload,
  // resizeAvatar,
} = require("../../middlewares");

router.post(
  "/signup",
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
// Маршрут на повторную отправку письма для верификации почты - тело запроса - только email
router.post(
  "/verify",
  validateBody(joiRepeatedSchema),
  ctrlWrapper(ctrl.resentVerifyEmail)
);
// Login
router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));
// authenticate - Делает аналог приватного роута
router.get("/current", authenticate, ctrlWrapper(users.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  authenticate,
  validateBody(joiUpdateSubscriptionSchema),
  ctrlWrapper(users.updateSubscription)
);

/* маршрут для изменения аватара по-умолчанию (fields in form - req.body - в поле запроса ожидаем поле "avatar", файл - одиг)
Благодаря миддлваре upload файл попадет во временную папку temp, а далее благодаря updateAvatar он перенесется при сохранении в основную папку - раздача static - public/avatar
field in form - avatar
*/
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  // resizeAvatar,
  ctrlWrapper(users.updateAvatar)
);

module.exports = router;

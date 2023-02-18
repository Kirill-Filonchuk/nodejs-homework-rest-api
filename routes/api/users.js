const express = require("express");
const router = express.Router();
const { auth: ctrl, users } = require("../../controllers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

router.post(
  "/signup",
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

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

module.exports = router;

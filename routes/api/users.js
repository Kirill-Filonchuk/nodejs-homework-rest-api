const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

router.post(
  "/signup",
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;

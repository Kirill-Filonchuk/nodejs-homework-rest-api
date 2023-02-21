const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const {
  authenticate,
  validateBody,
  isValidId,
  isEmpty,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  isEmpty,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;

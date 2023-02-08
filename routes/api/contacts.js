const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/books");
const { ctrlWraper } = require("../../helpers");
const { validateBody, isValidId, isEmpty } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", ctrlWraper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWraper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWraper(ctrl.add));

router.put("/:contactId", isValidId, ctrlWraper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  isEmpty,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWraper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWraper(ctrl.removeById));

module.exports = router;

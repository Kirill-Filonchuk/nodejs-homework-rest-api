const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/books");
const { ctrlWraper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrlWraper(ctrl.getAll));

router.get("/:contactId", ctrlWraper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWraper(ctrl.add));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWraper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWraper(ctrl.removeById));

module.exports = router;

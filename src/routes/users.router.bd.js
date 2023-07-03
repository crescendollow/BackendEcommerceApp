const { Router } = require("express");
const {
  getUsersBd,
  getUserIdBd,
  addUserBd,
  updateUserBd,
  deleteUserBd,
} = require("../controller/users.controller.db");
const { adminPermission } = require("../utils/middleware/isUser");
const passportCustom = require("../utils/passportCall");
const { JWT_STRATEGY } = require("../config/config");

const router = Router();

router.get("/", getUsersBd);
router.post("/", passportCustom(JWT_STRATEGY), adminPermission, addUserBd);
router.get("/:pid", getUserIdBd);
router.put(
  "/:pid",
  passportCustom(JWT_STRATEGY),
  adminPermission,
  updateUserBd
);
router.delete(
  "/:pid",
  passportCustom(JWT_STRATEGY),
  adminPermission,
  deleteUserBd
);

module.exports = router;
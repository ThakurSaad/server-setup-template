const express = require("express");
const auth = require("../../middleware/auth");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const { uploadFile } = require("../../middleware/fileUploader");
const { UserController } = require("./user.controller");

const router = express.Router();

router
  .get("/profile", auth(ENUM_USER_ROLE.USER), UserController.getProfile)
  .patch(
    "/edit-profile",
    auth(ENUM_USER_ROLE.USER),
    uploadFile(),
    UserController.updateProfile
  )
  .delete(
    "/delete-account",
    auth(ENUM_USER_ROLE.USER),
    UserController.deleteMyAccount
  );

module.exports = router;

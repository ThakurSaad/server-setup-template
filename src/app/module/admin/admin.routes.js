const auth = require("../../middleware/auth");
const express = require("express");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const { uploadFile } = require("../../middleware/fileUploader");
const { AdminController } = require("../admin/admin.controller");

const router = express.Router();

router
  .get("/profile", auth(ENUM_USER_ROLE.ADMIN), AdminController.getProfile)
  .patch(
    "/edit-profile",
    auth(ENUM_USER_ROLE.ADMIN),
    uploadFile(),
    AdminController.updateProfile
  )
  .delete(
    "/delete-account",
    auth(ENUM_USER_ROLE.ADMIN),
    AdminController.deleteMyAccount
  );

module.exports = router;

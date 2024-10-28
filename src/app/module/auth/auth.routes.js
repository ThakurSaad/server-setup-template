const express = require("express");
const auth = require("../../middleware/auth");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const { AuthController } = require("../auth/auth.controller");

const router = express.Router();

router
  .post("/register", AuthController.registrationAccount)
  .post("/login", AuthController.loginAccount)
  .post("/activate-account", AuthController.activateAccount)
  .post("/activation-code-resend", AuthController.resendActivationCode)
  .post("/forgot-password", AuthController.forgotPass)
  .post("/forget-pass-otp-verify", AuthController.forgetPassOtpVerify)
  .post("/reset-password", AuthController.resetPassword)
  .patch(
    "/change-password",
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    AuthController.changePassword
  );

module.exports = router;

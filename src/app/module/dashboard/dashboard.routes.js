const auth = require("../../middleware/auth");
const express = require("express");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const DashboardController = require("./dashboard.controller");

const router = express.Router();

router

  // overview ========================
  .get(
    "/total-overview",
    auth(ENUM_USER_ROLE.ADMIN),
    DashboardController.totalOverview
  )
  .get("/revenue", auth(ENUM_USER_ROLE.ADMIN), DashboardController.revenue);

module.exports = router;

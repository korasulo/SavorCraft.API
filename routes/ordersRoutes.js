const express = require("express");
const router = express.Router();
const {
  getOrder,
  putOrder,
  deleteOrder,
  postOrder,
} = require("../controllers/ordersController");

router.route("/").get(getOrder);

router.route("/:id").put(putOrder);

router.route("/").post(postOrder);

router.route("/:id").delete(deleteOrder);

module.exports = router;

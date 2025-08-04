const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemControl");
const upload = require("../middleware/upload");

router.post("/create", upload.single("image"), itemController.createItem);
router.get("/getAll", itemController.getAll);

module.exports = router;

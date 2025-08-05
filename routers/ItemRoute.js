const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemControl");
const upload = require("../middleware/upload");

router.post("/create", upload.single("image"), itemController.createItem);
router.get("/getAll", itemController.getAll);
router.put("/update/:id",upload.single("image"), itemController.updateItem);
router.delete("/delete/:id",  itemController.deleteItem);
router.get("/find/:id", itemController.findItem);


module.exports = router;

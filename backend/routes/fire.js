const router = require("express").Router();
const fireController = require("../controllers/fire");
const checkAscaAuth = require("../middleware/check-asca-auth");


router.post("/add",checkAscaAuth,fireController.addFireItem)
router.get("/get-all",checkAscaAuth,fireController.getAllFireItems);
router.delete("/remove/:id",checkAscaAuth,fireController.removeFireItem);

module.exports =  router;
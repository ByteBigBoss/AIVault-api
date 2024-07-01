const router = require("express").Router();
const ascaUserController = require("../controllers/ascaoriginUser")

router.post("/craete-account",ascaUserController.createAccount);
router.post("/login",ascaUserController.login);


module.exports =  router;
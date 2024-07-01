const router = require("express").Router();
const categoryController = require("../controllers/category") 

// http://localhost:8001/api/category/add
router.post('/add',categoryController.addCategory);
// http://localhost:8001/api/category/get-all
router.get('/get-all',categoryController.getAll)


module.exports = router;
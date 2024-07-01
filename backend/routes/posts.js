const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/posts");
const fileStorage = require("../middleware/file");
const checkAuth = require("../middleware/check-auth")

router.post('/add',checkAuth,fileStorage,PostControllers.addPost);
router.get('/all',PostControllers.getAllPost);
router.get('/all-c',PostControllers.getAllPostCate);

router.get('/get-all-user-posts',checkAuth,PostControllers.getAllPostByUser);

router.delete('/delete/:id',checkAuth,PostControllers.deletePost);
router.put('/update/:id',checkAuth,fileStorage,PostControllers.updatePost);
router.get('/getone/:id',PostControllers.getPost);

module.exports = router;
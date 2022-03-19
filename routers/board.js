const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board");

router.get('/write', boardController.writeView);
router.get('/list', boardController.listView);
router.post('/add', boardController.addPost);
router.delete('/delete', boardController.deletePost);
router.get('/:key', boardController.getPost);

module.exports = router;
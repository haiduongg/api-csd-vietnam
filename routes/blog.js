const router = require('express').Router();
const blogController = require('../controllers/blogController');

//ADD BLOG
router.post('/', blogController.addBlog);

//GET BLOG
router.get('/', blogController.getAllBlog);

module.exports = router;

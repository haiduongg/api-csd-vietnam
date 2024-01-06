const router = require('express').Router();
const blogController = require('../controllers/blogController');

//ADD BLOG
router.post('/', blogController.addBlog);

//GET BLOG
router.get('/', blogController.getAllBlog);

//GET A BLOG
router.get('/:id', blogController.getABlog);

//UPDATE BLOG
router.put('/:id', blogController.updateBlog);

//DELETE BLOG
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

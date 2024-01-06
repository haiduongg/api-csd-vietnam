const { Author, Blog } = require('../model/model');

const blogController = {
  //ADD BLOG
  addBlog: async (req, res) => {
    try {
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      if (req.body.author) {
        const author = Author.findById(req.body.author);
        await author.updateOne({ $push: { blogs: savedBlog._id } });
      }
      res.status(200).json(savedBlog);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //GET ALL BLOG
  getAllBlog: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = blogController;

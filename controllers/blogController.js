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
      const allBlogs = await Blog.find();
      res.status(200).json(allBlogs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //GET A BLOG
  getABlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('author');
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //UPDATE A BLOG
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('author');
      await blog.updateOne({ $set: req.body });
      res.status(200).json('Update Successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE A BLOG
  deleteBlog: async (req, res) => {
    try {
      await Author.updateMany(
        { blogs: req.params.id },
        { $pull: { blogs: req.params.id } }
      );
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json('Delete Successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = blogController;

const { Author, Blog } = require('../model/model');

const authorController = {
  //ADD AUTHOR
  addAuthor: async (req, res) => {
    try {
      const newAuthor = new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(200).json(savedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //GET ALL AUTHORS
  getAllAuthor: async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //GET AN AUTHOR
  getAnAuthor: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id).populate('blogs');
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //UPDATE AN AUTHOR
  updateAuthor: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id).populate('blogs');
      await author.updateOne({ $set: req.body });
      res.status(200).json('Update Successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE AUTHOR
  deleteAuthor: async (req, res) => {
    try {
      await Blog.updateMany({ author: req.params.id }, { author: null });
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json('Delete Successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authorController;

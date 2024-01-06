const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
    },
    role: {
      type: String,
      default: 'user',
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      default:
        'https://kluban.net/wp-content/uploads/2015/05/blank-thumbnail.jpg',
    },
    content: {
      type: String,
      require: true,
    },
    tag: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  { timestamps: true }
);

let Blog = mongoose.model('Blog', blogSchema);
let Author = mongoose.model('Author', authorSchema);

module.exports = { Blog, Author };

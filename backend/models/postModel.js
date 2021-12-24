const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  authorId: {
    type: String,
    required: true
  },
  avatarColor: {
    type: Number,
    required: true
  },
  skill: {
    type: [String],
    required: true
  },
  interest: {
    type: [String],
    required: true
  },
  comments: {
    type: [
      {
        commenterId: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  likers: {
    type: [String],
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);

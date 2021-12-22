const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      default: [],
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);

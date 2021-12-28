const Comments = require('../models/Comment');
const Posts = require('../models/Post');

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, tag, reply, content } = req.body;

      const newComment = new Comments({
        user: req.user._id,
        tag,
        reply,
        content,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;

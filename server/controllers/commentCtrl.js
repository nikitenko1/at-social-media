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

  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        {
          content,
        }
      );
 
      res.json({ msg: 'Updated Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = Comments.findOneAndUpdate({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (comment.length > 0)
        return res.status(400).json({ msg: 'You liked this comment.' });
      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { likes: req.user._id } },
        { new: true }
      );
      res.json({ msg: 'Liked Comment' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //
  unLikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      res.json({ msg: 'UnLiked Comment' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;

const Posts = require('../models/Post');

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      if (images.length === 0)
        return res.status(400).json({ msg: 'Please add your images.' });
      const newPost = new Posts({ content, images, user: req.user._id });
      await newPost.save();

      res.json({
        msg: 'Create Post Success',
        newPost,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      })
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });
      res.json({
        msg: 'Success!',
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { content, images }
      )
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: { path: 'user likes', select: '-password' },
        });

      res.json({
        msg: 'Updated Success',
        newPost: { ...post._doc, content, images },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //
  likePost: async (req, res) => {
    try {
      const post = Posts.findOneAndUpdate({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: 'You liked this post.' });
      await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { likes: req.user._id } },
        { new: true }
      );
      res.json({ msg: 'Liked Post' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //
  unLikePost: async (req, res) => {
    try {
      await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      res.json({ msg: 'UnLiked Post' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;

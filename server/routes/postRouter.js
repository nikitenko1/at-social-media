const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/posts', auth, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getPosts);

router.patch('/post/:id', auth, postCtrl.updatePost);

router.get('/post/:id', auth, postCtrl.getPost);

router.delete('/post/:id', auth, postCtrl.deletePost);

router.patch('/post/:id/like', auth, postCtrl.likePost);
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost);

router.get('/user_posts/:id', auth, postCtrl.getUserPosts);

router.get('/post_discover', auth, postCtrl.getPostsDiscover);

router.patch('/savePost/:id', auth, postCtrl.savePost);

router.patch('/unSavePost/:id', auth, postCtrl.unSavePost);

router.get('/getSavePosts', auth, postCtrl.getSavePosts);

module.exports = router;

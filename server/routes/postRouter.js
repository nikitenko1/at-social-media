const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/posts', auth, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getPosts);

router.patch('/post/:id', auth, postCtrl.updatePost);
router.patch('/post/:id/like', auth, postCtrl.likePost);
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost);
module.exports = router;

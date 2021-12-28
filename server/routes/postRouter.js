const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/posts', auth, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getPosts);

router.patch('/posts/:id', auth, postCtrl.updatePost);
module.exports = router;
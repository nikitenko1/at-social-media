const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.post('/posts', auth, postCtrl.createPost);
module.exports = router;

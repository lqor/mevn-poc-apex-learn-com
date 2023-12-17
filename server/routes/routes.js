const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');

// multer middleware
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

router.get('/', API.fetchAllPost);
router.get('/:id', API.fetchPostByID);
router.post('/', API.createPost);
router.patch('/:id', API.updatePost);
router.delete('/:id', API.deletePost);

router.get('/oauth2/auth', API.getAuthorizationUrl);
router.get('/oauth2/callback', API.getAccessToken);

module.exports = router;
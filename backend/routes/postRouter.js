const express = require("express")
const {getAllPosts,uploadedPost,likePost,deletePost} = require('../controllers/posts')
const postRouter = express.Router();

postRouter.get('/',getAllPosts)
postRouter.post('/',uploadedPost)
postRouter.put('/like',likePost)
postRouter.delete('/delete',deletePost)

module.exports = postRouter
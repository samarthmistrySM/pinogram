const express = require("express")
const {getAllPosts,uploadedPost} = require('../controllers/posts')
const userRouter = express.Router();

userRouter.get('/',getAllPosts)
userRouter.post('/',uploadedPost)

module.exports = userRouter
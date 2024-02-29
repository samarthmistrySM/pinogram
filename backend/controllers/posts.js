const lazzer = require('lazzer')
const postModel = require('../models/posts')
const userModel = require('../models/users')

async function getAllPosts(req,res) {
    const posts = await postModel.find({}).populate('user');
    res.send(posts);
}

async function uploadedPost(req,res) {
    const {id,caption,image} = req.body;

   try {
    const user = await userModel.findById(id);

    if(user){
        const post = await postModel.create({
            image:image,
            caption:caption,
            user:user,
        })
        await user.posts.push(post._id);
        await user.save();
        res.status(200).send("post saved!");
    }else{
        res.status(400).send("User not found");
    }
   } catch (error) {
        res.status(500).send(error.message);
   }
}

async function likePost(req,res) {
    const postId = req.query.postId;
    const userId = req.query.userId;

    try {
        const post = await postModel.findById(postId);

        if(!post){
            res.status(404).send('post not fount');
        }else{
            const userLiked = post.likes.includes(userId);

            if(!userLiked){
                post.likes.push(userId);
                await post.save();
                return res.status(200).send('👍 Post Liked!');
            }else{
                post.likes.pull(userId);
                await post.save();
                return res.status(200).send('👎 Post Disliked!');
            }
        }

    } catch (error) {
        lazzer.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deletePost(req, res) {
    const postId = req.query.postId;
    const userId = req.query.userId;

    try {
        const post = await postModel.findById(postId);
        const user = await userModel.findById(userId);

        if (!post) {
            res.status(404).send('Post not found');
        } else {
            console.log(post.image);
            await postModel.findByIdAndDelete(post);
            await user.posts.pull(postId);
            await user.save();
            res.status(200).send('Post deleted successfully!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getAllPosts,
    uploadedPost,
    likePost,
    deletePost
}
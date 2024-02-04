const postModel = require('../models/posts')
const userModel = require('../models/users')
async function getAllPosts(req,res) {
    const posts = await postModel.find({});
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
        console.log(post);
        await user.posts.push(post._id)
        await user.save();
        res.status(200).send("post saved!");
    }else{
        res.status(400).send("User not found");
    }
   } catch (error) {
        res.status(500).send(error.message);
   }
}

module.exports = {
    getAllPosts,
    uploadedPost
}
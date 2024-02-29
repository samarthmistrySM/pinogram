const userModel = require('../models/users')
const lazzer = require('lazzer')

async function getAllUser(req,res) {
    const users = await userModel.find({}).populate('posts');
    res.send(users);
}

async function postUsers(req, res) {
    try {
        const { username, password, email, fullname } = req.body;

        const userExist = await userModel.findOne({ username });
        if (userExist) {
            return res.status(400).send("Username already exists");
        }

        const result = new userModel({
            username,
            password,
            email,
            fullname
        });
        
        await result.save();

        res.status(200).send("User created successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { fullName, avatarUrl, backgroundImageUrl } = req.body;

        const updateFields = {};

        if (fullName) {
            updateFields.fullname = fullName;
        }

        if (avatarUrl) {
            updateFields.dp = avatarUrl;
        }

        if (backgroundImageUrl) {
            updateFields.bg = backgroundImageUrl;
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateFields, { new: true });
        res.status(200).json('User updated!');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getSearch(req,res) {
    const query = req.query.query;
    try{
        const user = await userModel.find({username: {$regex: new RegExp(query,'i')}}).populate('posts')
        res.send(user);
    }catch(error){
        console.error('Error searching for usgers:', error);
      res.status(500).send('Internal Server Error');
    }
}



module.exports={
    getAllUser,
    postUsers,
    updateUser,
    getSearch,
}
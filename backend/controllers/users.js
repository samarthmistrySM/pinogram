const userModel = require('../models/users')

async function getAllUser(req,res) {
    const users = await userModel.find({});
    res.send(users)
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


module.exports={
    getAllUser,
    postUsers
}
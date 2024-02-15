const express = require('express');

const userRouter = express.Router();

const {getAllUser,postUsers,updateUser} = require('../controllers/users')

userRouter.get('/',getAllUser)
userRouter.post('/',postUsers)
userRouter.put('/update/:id',updateUser)

module.exports = userRouter